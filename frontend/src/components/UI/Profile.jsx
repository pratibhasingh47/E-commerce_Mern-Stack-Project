import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        gender: user?.gender || "",
        dob: user?.dob || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        additionalPhoneNumber: user?.additionalPhoneNumber || "",
        country: user?.address?.country || "",
        state: user?.address?.state || "",
        city: user?.address?.city || "",
        zipCode: user?.address?.zipCode || "",
        address1: user?.address?.address1 || "",
    });

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

    return (
        <div>
            <h2>Profile</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                {/* Add more fields like username, gender, dob, etc. */}
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} disabled />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Additional Phone Number</label>
                    <input
                        type="text"
                        name="additionalPhoneNumber"
                        value={formData.additionalPhoneNumber}
                        onChange={handleChange}
                    />
                </div>
                {/* Add Address Section */}
                <div>
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Zip Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Address 1</label>
                    <input
                        type="text"
                        name="address1"
                        value={formData.address1}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;
