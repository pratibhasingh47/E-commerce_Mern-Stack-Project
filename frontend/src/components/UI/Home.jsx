import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../redux/slices/productSlice'
import { addToCart } from '../../redux/slices/cartSlice'
import Footer from './Footer'
import Carousel from './Carousel'

const Home = () => {
	const { products } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllProduct());
	}, [dispatch]);

	const handleAddCart = (data) => {
		dispatch(addToCart(data));
	}

	// Group products by category
	const groupedProducts = products.reduce((acc, product) => {
		const { category } = product; 
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(product);
		return acc;
	}, {});

	return (
		<div>
			<Carousel />
			<div className='w-[90%] mx-auto'>
				
				{Object.keys(groupedProducts).map((category, index) => (
					<div key={index} className='mt-10'>
						<h2 className='text-3xl font-bold font-lato text-left'>{category}</h2>
						<div className='grid grid-cols-5 gap-8 font-sans mt-4'>
							{groupedProducts[category].map((item, i) => (
								<div key={i} className='p-4 flex flex-col items-center w-auto h-[100%] justify-center bg-white rounded'>
									<img src={`http://localhost:5000/${item.productUrl}`} className='object-contain bg-contain w-4/5 h-4/5' alt={item.name} />
									<div className='flex justify-between w-[100%] px-4 items-center'>
										<div className='mt-5'>
											<p className='text-sm text-black w-44 py-1'>{item.name}</p>
											<p className='text-sm text-black py-1'>₹{item.price}</p>
										</div>
										<div className='mt-5'>
											<button
												className='p-2 text-black border border-black text-xs hover:bg-black hover:text-white'
												onClick={() => handleAddCart(item)}
											>
												Add to cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<Footer />
		</div>
	);
}

export default Home;






// import { jwtDecode } from 'jwt-decode'
// import Carousel from './Carousel'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllProduct } from '../../redux/slices/productSlice'
// import { addToCart } from '../../redux/slices/cartSlice'
// import Footer from './Footer'

// const Home = () => {
// 	const { products } = useSelector((state) => state.product);
// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(getAllProduct());
// 	}, []);

// 	const handleAddCart = (data) => {
// 		dispatch(addToCart(data));
// 	}

// 	return (
// 		<div>
// 			<Carousel  />
// 			<div className='w-[90%]  mx-auto'>
// 				<div className='grid grid-cols-5 gap-8  font-sans'>
// 					{products.map((item, i) => (
// 						<div key={i} className=' p-4 flex flex-col items-center w-auto h-[100%] justify-center  bg-white rounded'>
// 							<img src={`http://localhost:5000/${item.productUrl}`} className='object-contain bg-contain w-4/5 h-4/5' alt="" />
// 							<div className='flex justify-between w-[100%] px-4 items-center'>
// 								<div className='mt-5'>
// 									<p className=' text-sm text-black w-44 py-1'>{item.name}</p>
// 									<p className='text-sm text-black py-1'>{item.price}</p>
// 								</div>
// 								<div className='mt-5'>
// 									<button className='p-2 text-black border border-black text-xs hover:bg-black hover:text-white' onClick={() => { handleAddCart(item) }}>Add to cart</button>
// 								</div>
// 							</div>

// 						</div>
// 					))}
// 				</div>
// 			</div>
// 			<Footer/>
// 		</div>
// 	)
// }

// export default Home