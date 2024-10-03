import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../redux/slices/address';
import { FaPlusCircle } from 'react-icons/fa'; // Importing an icon for the button

const Order = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state) => state.cart.cartItem);
	const addressState = useSelector((state) => state.address);

	const theme = useSelector((state) => state.theme?.theme);


	const [address, setAddress] = useState('');
	const [isAddressSaved, setIsAddressSaved] = useState(false); // New state to track if address is saved


	useEffect(() => {
		const savedAddress = localStorage.getItem('shippingAddress');
		if (savedAddress) {
			setAddress(savedAddress);
			setIsAddressSaved(true);
		}
	}, []);

	const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	// Calculate expected delivery date (5 days ahead)
	const getExpectedDeliveryDate = () => {
		const today = new Date();
		const deliveryDate = new Date(today.setDate(today.getDate() + 5));
		return deliveryDate.toLocaleDateString();
	};

	const handleAddAddress = () => {
		if (address.trim()) {
			dispatch(addAddress(address));
			localStorage.setItem('shippingAddress', address); // Save address to local storage
			setIsAddressSaved(true); // Update state to show address is saved
		}
	};

	const handleEditAddress = () => {
		setAddress(''); // Clear the address field for new input
		setIsAddressSaved(false); // Mark address as unsaved
		localStorage.removeItem('shippingAddress'); // Remove address from local storage
	};

	return (
		<div className="w-[90%] font-lato mx-auto">
			<div className="flex w-[100%] flex-wrap justify-center gap-20 p-8">

				{/* Cart Items Section */}
				{/* <div className="bg-gray-100 w-[50%] shadow-lg p-10 rounded"> */}
				<div className={` bg-gray-100 w-[50%] shadow-2xl  p-10 rounded ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>
					<h1 className="text-3xl font-lato font-bold mb-6">Order Summary</h1>
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
											<p>Price: ₹{item.price}</p>
											<p>Quantity: {item.quantity}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				{/* Address & Summary Section */}
				{/* <div className="w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl"> */}
				<div className={` w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-2xl ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>
					<h2 className="text-3xl font-lato font-bold mb-6">Delivery Address</h2>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)} // Update state on change
						placeholder="Enter delivery address..."
						// className="w-full text-black p-2 border rounded mb-4"
						className={` w-full text-black p-2 border rounded mb-4 ${theme === 'dark' ? ' text-white' : 'text-black'}`}
						disabled={isAddressSaved} // Disable field if an address is present
					/>
					{!isAddressSaved && (
						<button
							onClick={handleAddAddress} // Save the address on button click
							className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-700"
						>
							Save Address
						</button>
					)}
					{addressState.loading && <p>Saving address...</p>}
					{addressState.error && <p className="text-red-600">{addressState.error}</p>}
					{isAddressSaved && <p className="text-green-600">Address saved successfully!</p>}

					{isAddressSaved && (
						<div className="mt-4">
							<h3 className="text-xl font-lato font-bold">Shipping Address:</h3>
							<p>{address}</p>
							<p className="mt-2">Expected Delivery Date: {getExpectedDeliveryDate()}</p>
							<button
								onClick={handleEditAddress}
								className="flex items-center mt-4 text-blue-500 hover:underline"
							>
								<FaPlusCircle className="mr-2" />
								Add Address
							</button>
						</div>
					)}

					<div className="mt-8">
						<h2 className="text-2xl font-lato font-bold mb-4">Order Summary</h2>
						<p>Total Items: {totalItems}</p>
						<ul className="mt-4 mb-6">
							{cartItems.map((item, index) => (
								<li key={index} className="flex justify-between mb-2">
									<span>{item.name} ({item.quantity})</span>
									<span>₹{item.price * item.quantity}</span>
								</li>
							))}
						</ul>
						<p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
						<button className="bg-amber-500 text-white font-bold px-4 py-2 mt-4 w-full hover:bg-blue-600">
							Pay Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Order;




























// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAddress } from '../../redux/slices/address';

// const Order = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.cartItem);
//     const addressState = useSelector((state) => state.address);

//     const [address, setAddress] = useState('');

//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     const handleAddAddress = () => {
//         if (address.trim()) {
//             dispatch(addAddress(address));
//         }
//     };

//     return (
//         <div className="w-[90%] mx-auto">
//             <div className="flex w-[100%] flex-wrap justify-center gap-20 p-8">

//                 {/* Cart Items Section */}
//                 <div className="bg-gray-100 w-[50%] shadow-lg p-10 rounded">
//                     <h1 className="text-3xl font-lato font-bold mb-4">Order Summary</h1>
//                     {cartItems.length === 0 ? (
//                         <p>Your cart is empty.</p>
//                     ) : (
//                         <div className="space-y-6">
//                             <ul>
//                                 {cartItems.map((item, index) => (
//                                     <li key={index} className="flex justify-between items-center border-b pb-4 mb-6">
//                                         <div>
//                                             <img
//                                                 src={`http://localhost:5000/${item.productUrl}`}
//                                                 alt={item.name}
//                                                 className="w-20 h-auto object-cover mb-4 rounded"
//                                             />
//                                             <h2 className="text-xl font-lato pb-3 font-bold">Product: {item.name}</h2>
//                                             <p>Price: ${item.price}</p> {/* Display product price */}
//                                             <p>Quantity: {item.quantity}</p>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 {/* Address & Summary Section */}
//                 <div className="w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl">
//                     <h2 className="text-2xl font-lato font-bold mb-4">Delivery Address</h2>
//                     <textarea
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         placeholder="Enter delivery address..."
//                         className="w-full p-2 border rounded mb-4"
//                     />
//                     <button
//                         onClick={handleAddAddress}
//                         className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-700"
//                     >
//                         Save Address
//                     </button>
//                     {addressState.loading && <p>Saving address...</p>}
//                     {addressState.error && <p className="text-red-600">{addressState.error}</p>}
//                     {addressState.address && <p className="text-green-600">Address saved successfully!</p>}

//                     <div className="mt-8">
//                         <h2 className="text-2xl font-lato font-bold mb-4">Order Summary</h2>
//                         <p>Total Items: {totalItems}</p>
//                         <ul className="mt-4 mb-6">
//                             {cartItems.map((item, index) => (
//                                 <li key={index} className="flex justify-between mb-2">
//                                     <span>{item.name} ({item.quantity})</span>
//                                     <span>${item.price * item.quantity}</span> {/* Add price next to the product name */}
//                                 </li>
//                             ))}
//                         </ul>
//                         <p className="text-lg font-bold">Total Price: ${totalPrice}</p>
//                         <button className="bg-orange-500 text-white font-bold px-4 py-2 mt-4 w-full hover:bg-blue-600">
//                             Pay Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Order;



