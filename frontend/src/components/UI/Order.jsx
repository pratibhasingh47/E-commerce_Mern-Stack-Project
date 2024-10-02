import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../redux/slices/address';

const Order = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItem);
    const addressState = useSelector((state) => state.address);

    const [address, setAddress] = useState('');

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleAddAddress = () => {
        if (address.trim()) {
            dispatch(addAddress(address));
        }
    };

    return (
        <div className="w-[90%] mx-auto">
            <div className="flex w-[100%] flex-wrap justify-center gap-20 p-8">

                {/* Cart Items Section */}
                <div className="bg-gray-100 w-[50%] shadow-lg p-10 rounded">
                    <h1 className="text-3xl font-lato font-bold mb-4">Order Summary</h1>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <div className="space-y-6">
                            <ul>
                                {cartItems.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center border-b pb-4 mb-6">
                                        <div>
                                            <img
                                                src={`http://localhost:5000/${item.productUrl}`}
                                                alt={item.name}
                                                className="w-20 h-auto object-cover mb-4 rounded"
                                            />
                                            <h2 className="text-xl font-lato pb-3 font-bold">Product: {item.name}</h2>
                                            <p>Price: ${item.price}</p> {/* Display product price */}
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Address & Summary Section */}
                <div className="w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-lato font-bold mb-4">Delivery Address</h2>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter delivery address..."
                        className="w-full p-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleAddAddress}
                        className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save Address
                    </button>
                    {addressState.loading && <p>Saving address...</p>}
                    {addressState.error && <p className="text-red-600">{addressState.error}</p>}
                    {addressState.address && <p className="text-green-600">Address saved successfully!</p>}

                    <div className="mt-8">
                        <h2 className="text-2xl font-lato font-bold mb-4">Order Summary</h2>
                        <p>Total Items: {totalItems}</p>
                        <ul className="mt-4 mb-6">
                            {cartItems.map((item, index) => (
                                <li key={index} className="flex justify-between mb-2">
                                    <span>{item.name} ({item.quantity})</span>
                                    <span>${item.price * item.quantity}</span> {/* Add price next to the product name */}
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
                        <button className="bg-orange-500 text-white font-bold px-4 py-2 mt-4 w-full hover:bg-blue-600">
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
