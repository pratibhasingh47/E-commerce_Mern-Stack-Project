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
        address1: "",
    });

    useEffect(() => {
        dispatch(getUserProfile()); // Dispatch the thunk to get user profile on mount
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                username: user.username || "",
                gender: user.gender || "",
                dob: user.dob || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                additionalPhoneNumber: user.additionalPhoneNumber || "",
                country: user.address?.country || "",
                state: user.address?.state || "",
                city: user.address?.city || "",
                zipCode: user.address?.zipCode || "",
                address1: user.address?.address1 || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(formData));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file); // For now, just log the file
    };

    return (
        <div className="p-6 bg-white text-black rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            </div>

            {isLoading && <p className="text-yellow-500">Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center mb-4">
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
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        disabled 
                        className="p-2 rounded border bg-gray-100 text-black cursor-not-allowed"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Additional Phone Number</label>
                    <input
                        type="text"
                        name="additionalPhoneNumber"
                        value={formData.additionalPhoneNumber}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Address</label>
                    <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                        className="p-2 rounded border bg-gray-100 text-black"
                    />
                </div>

                <button 
                    type="submit" 
                    className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700 transition-colors"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
