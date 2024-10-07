import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserProfile } from "../../redux/slices/authSlice"; // Import the thunk
import { AiOutlineUpload } from "react-icons/ai"; // Importing an icon for upload
import { AiOutlineEdit } from "react-icons/ai"; // Importing an icon for edit

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        gender: "",
        dob: "",
        email: "",
        phoneNumber: "",
        additionalPhoneNumber: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        address: "",
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // State to track edit mode

    useEffect(() => {
        dispatch(getUserProfile());
        fetchCountries();
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                gender: user.gender || "",
                dob: user.dob || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                additionalPhoneNumber: user.additionalPhoneNumber || "",
                country: user.country || "",
                state: user.state || "",
                city: user.city || "",
                zipCode: user.zipCode || "",
                address: user.address || "",
            });
        }
    }, [user]);



    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            setCountries(data.map(country => ({ name: country.name.common, code: country.cca2 })));
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const fetchStates = async (country) => {
        try {
            const response = await fetch(`https://countriesnow.space/api/v0.1/countries/states`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ country: country }),
            });
            const data = await response.json();
            setStates(data.data.states);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchCities = async (state) => {
        try {
            const response = await fetch(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ country: formData.country, state: state }),
            });
            const data = await response.json();
            setCities(data.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "country") {
            fetchStates(value); // Fetch states when country changes
            setFormData((prevData) => ({
                ...prevData,
                state: "", // Reset state and city when country changes
                city: "",
            }));
        } else if (name === "state") {
            fetchCities(value); // Fetch cities when state changes
            setFormData((prevData) => ({
                ...prevData,
                city: "", // Reset city when state changes
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(formData));
        setIsEditing(false); // Exit edit mode after submission
    };

    const handleEditToggle = () => {
        setIsEditing((prev) => !prev); // Toggle edit mode
    };

    if (!user) {
        return <div>Loading...</div>; // You can add a loading spinner or placeholder here
    }

    return (
        <div className="flex justify-center w-screen font-lato items-center ">
            <div className="p-6 mt-8 mb-16 w-[70%] h-auto font-lato bg-white text-black rounded-lg shadow-lg">
                <div className="flex justify-between mb-8 items-center">
                    <h2 className="text-3xl font-lato font-bold mb-4">Profile</h2>
                    <button
                        onClick={handleEditToggle}
                        className="border px-4 py-2 bg-slate-900 rounded-md text-white hover:text-xl flex items-center"
                    >
                        <AiOutlineEdit className="mr-1" />
                        {isEditing ? "Cancel Edit" : "Edit Profile"}
                    </button>
                </div>

                {/* {isLoading && <p className="text-yellow-500">Loading...</p>}
                {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>} */}

                <form onSubmit={handleSubmit} className="w-[100%] space-y-4">
                    <div className="grid grid-cols-2 mb-6 gap-1">
                        <div className="flex w-[90%] flex-col">
                            <label className="mb-2 font-medium">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={!isEditing} // Disable field when not editing
                                className={`p-2 rounded w-full border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                            />
                        </div>

                        <div className="flex w-[90%] flex-col">
                            <label className="mb-2 font-medium">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={!isEditing} // Disable field when not editing
                                className={`p-2 rounded w-full border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                            />
                        </div>
                    </div>

                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 w-1/5 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 rounded w-[35%] border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black cursor-not-allowed"
                        />
                    </div>

                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 font-medium">Date</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 w-[75%] rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        />
                    </div>

                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 font-medium">Mobile Number 1:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 w-[75%] rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        />
                    </div>

                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 font-medium">Mobile Number 2:</label>
                        <input
                            type="text"
                            name="additionalPhoneNumber"
                            value={formData.additionalPhoneNumber}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 w-[75%] rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        />
                    </div>

                    {/* <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">Country</label>
                            {user.address.country ? ( // Check if country exists
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.address.country}
                                    onChange={handleChange}
                                    disabled // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Disable field when not editing
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">State</label>
                            {user.address?.state ? ( // Check if state exists
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.address.state}
                                    onChange={handleChange}
                                    disabled // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing || states.length === 0} // Disable field when not editing or if no states available
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.name} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">City</label>
                            {user.address?.city ? ( // Check if city exists
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="city"
                                    value={formData.address.city}
                                    onChange={handleChange}
                                    disabled={!isEditing || cities.length === 0} // Disable field when not editing or if no cities available
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div> */}

                    <div className="grid grid-cols-3 mb-6 gap-4">
                        {/* Country */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">Country</label>
                            {formData.country ? ( // Show input field when country exists
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    disabled={!isEditing}  // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    disabled={!isEditing} // Disable field when not editing
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* State */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">State</label>
                            {formData.state ? ( // Show input field when state exists
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing || states.length === 0}  // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing || states.length === 0} // Disable field when not editing or if no states available
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.name} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* City */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium">City</label>
                            {formData.city ? ( // Show input field when city exists
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled ={!isEditing || cities.length === 0} // Disable field when not editing
                                    className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                                />
                            ) : (
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    disabled={!isEditing || cities.length === 0} // Disable field when not editing or if no cities available
                                    className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>


                    <div className="flex mb-6 flex-col">
                        <label className="mb-2 font-medium">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 w-[25%] rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        />
                    </div>

                    <div className="flex flex-col pb-10">
                        <label className="mb-2 font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing} // Disable field when not editing
                            className={`p-2 rounded border bg-gray-100 text-black ${!isEditing ? 'cursor-not-allowed' : ''}`}
                        />
                    </div>

                    {isEditing && (
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Update Profile
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;
