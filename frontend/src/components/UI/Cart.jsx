// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearCart, incrementQuantity, decrementQuantity } from '../../redux/slices/cartSlice'; 
// import {useNavigate} from 'react-router-dom';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.cartItem);

//     const { isAuth } = useSelector((state) => state.auth);

//     const theme = useSelector((state) => state.theme?.theme);


//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//     const navigate = useNavigate(); 

//     const handleClearCart = () => {
//         dispatch(clearCart());
//     };

//     const handleBuyNow = () => {
//         if(!isAuth){
//             navigate('/login');
//         }
//         else{
//             navigate('/order');
//         }
//     };

//     return (
//         <div className='w-[90%]  mx-auto'>

//             <div className="flex w-[100%] flex-wrap justify-center gap-20 p-8">

//                 {/* <div className="w-3/6 bg-gray-100 shadow-lg p-10 rounded"> */}
//                 <div className={` className=" bg-gray-100 w-[50%] shadow-lg p-10 rounded ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>

//                     <h1 className="text-3xl font-lato font-bold mb-4">Your Cart</h1>
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
//                                             <h2 className="text-xl font-lato pb-3 font-bold"><strong>Product Name :</strong> {item.name}</h2>
//                                             <p><strong>Price:</strong> ₹{item.price}</p>
//                                             <p><strong>Description:</strong> {item.description}</p>
//                                             <p><strong>Category:</strong> {item.category}</p>
//                                         </div>
//                                         <div className="flex items-center">
//                                             <button
//                                                 onClick={() => dispatch(decrementQuantity(item.name))}
//                                                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-900"
//                                             >
//                                                 -
//                                             </button>
//                                             <span className="px-4">{item.quantity}</span>
//                                             <button
//                                                 onClick={() => dispatch(incrementQuantity(item.name))}
//                                                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                             <button
//                                 onClick={handleClearCart}
//                                 className="bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black"
//                             >
//                                 Clear Cart
//                             </button>
//                         </div>
//                     )}
//                 </div>


//                 {/* <div className="w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl"> */}
//                 <div className={` w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>

//                     <h2 className="text-2xl font-lato font-bold mb-4">Cart Summary</h2>
//                     <p className="text-lg">Total Items: {totalItems}</p>
//                     <ul className="mt-4 mb-6">
//                         {cartItems.map((item, index) => (
//                             <li key={index} className="flex justify-between mb-2">
//                                 <span>{item.name} ({item.quantity})</span>
//                                 <span>₹{item.price * item.quantity}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
//                     <button  onClick={handleBuyNow} className="bg-orange-500 text-white font-lato font-bold px-4 py-2 mt-4 w-full  hover:bg-blue-600">
//                         Buy Now
//                     </button>
//                 </div>
//             </div>


//         </div>
//     );
// };

// export default Cart;















import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, incrementQuantity, decrementQuantity, fetchCartAsync } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItem);
    const { isAuth } = useSelector((state) => state.auth);
    const theme = useSelector((state) => state.theme?.theme);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const navigate = useNavigate();

    const handleClearCart = () => {
        if (!isAuth) {
            localStorage.removeItem("cart")
        }
        dispatch(clearCart());
    };

    const handleBuyNow = () => {
        if (!isAuth) {
            navigate('/login');
        } else {
            navigate('/order');
        }
    };

    useEffect(() => {
        dispatch(fetchCartAsync());
    }, [dispatch]);

    return (
        <div className='w-[90%] mx-auto'>
            <div className="flex w-[100%] flex-wrap justify-center gap-20 p-8">
                <div className={`bg-gray-100 w-[50%] shadow-lg p-10 rounded ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>
                    <h1 className="text-3xl font-lato font-bold mb-4">Your Cart</h1>
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
                                            <h2 className="text-xl font-lato pb-3 font-bold"><strong>Product Name :</strong> {item.name}</h2>
                                            <p><strong>Price:</strong> ₹{item.price}</p>
                                            <p><strong>Description:</strong> {item.description}</p>
                                            <p><strong>Category:</strong> {item.category}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => dispatch(decrementQuantity(item.productId))}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-900"
                                            >
                                                -
                                            </button>
                                            <span className="px-4">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(incrementQuantity(item.productId))}
                                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handleClearCart}
                                className="bg-red-600 font-bold text-white px-4 py-2 rounded hover:bg-red-300 hover:text-black"
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>

                <div className={`w-1/3 h-min bg-gray-100 p-6 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>
                    <h2 className="text-2xl font-lato font-bold mb-4">Cart Summary</h2>
                    <p className="text-lg">Total Items: {totalItems}</p>
                    <ul className="mt-4 mb-6">
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between mb-2">
                                <span>{item.name} ({item.quantity})</span>
                                <span>₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg font-bold">Total Price: ₹{totalPrice}</p>
                    <button onClick={handleBuyNow} className="bg-orange-500 text-white font-lato font-bold px-4 py-2 mt-4 w-full hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;

