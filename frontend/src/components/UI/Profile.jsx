import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserProfile } from "../../redux/slices/authSlice"; // Import the thunk
import { AiOutlineUpload } from "react-icons/ai"; // Importing an icon for upload

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

    useEffect(() => {
        dispatch(getUserProfile());
        fetchCountries()
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
                country: user.address?.country || "",
                state: user.address?.state || "",
                city: user.address?.city || "",
                zipCode: user.address?.zipCode || "",
                address: user.address?.address || "",
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
            // Fetch states based on the selected country
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
            // Fetch cities based on the selected state
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
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     console.log(file); 
    // };

    return (

        <div className="flex justify-center items-center ">


            <div className="p-6 mt-8  mb-16  w-[70%] h-auto font-lato  bg-white text-black rounded-lg shadow-lg">

                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-lato font-bold mb-4">Profile</h2>
                </div>

                {isLoading && <p className="text-yellow-500">Loading...</p>}
            {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}

                <form onSubmit={handleSubmit} className="w-[100%] space-y-4">

                    {/* <div className="flex items-center mb-4">
                    <div className="w-16 h-16 border rounded-full overflow-hidden mr-4 flex items-center justify-center">
					<img src="" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					className="hidden"
					id="upload"
                    />
                    <label htmlFor="upload" className="flex items-center cursor-pointer">
					<AiOutlineUpload className="text-gray-500 mr-2" />
					Upload Profile Picture
                    </label>
					</div> */}

                    <div className="grid grid-cols-2 gap-1">

                        <div className="flex w-[70%] flex-col">
                            <label className="mb-2 font-medium">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="p-2 rounded w-full border bg-gray-100 text-black"
                            />
                        </div>

                        <div className="flex w-[70%] flex-col">
                            <label className="mb-2 font-medium">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="p-2 rounded  w-full border bg-gray-100 text-black"
                            />
                        </div>

                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 w-1/5 font-medium">Gender</label> {/* Added Gender Label */}
                        <select
                            name="gender" // Gender select input
                            value={formData.gender}
                            onChange={handleChange}
                            className="p-2 rounded w-[35%] border bg-gray-100 text-black"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            disabled
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Date</label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Mobile Number 1:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Mobile Number 2:</label>
                        <input
                            type="text"
                            name="additionalPhoneNumber"
                            value={formData.additionalPhoneNumber}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">State</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.name} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">City</label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="p-2 w-[75%] rounded border bg-gray-100 text-black"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-medium">Address(Street Address)</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="p-2 w-[85%] rounded border bg-gray-100 text-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 font-lato font-bold text-white p-2 rounded hover:bg-blue-600"
                    >
                        Update Profile
                    </button>


                </form>
            </div>


        </div>
    );
};

export default Profile;
