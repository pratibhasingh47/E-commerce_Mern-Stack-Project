// import React, { useEffect } from 'react';
// import { RouterProvider } from 'react-router-dom';
// import Router from './router/router';
// import { Provider, useSelector } from 'react-redux';
// import store from './redux/store/store';
// import '@fontsource/inter';

// const ThemeHandler = () => {
// 	const theme = useSelector((state) => state.theme?.theme); // Add optional chaining to prevent undefined access

// 	useEffect(() => {
// 		document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
// 	}, [theme]);

// 	return null; 
// };


// function App() {
// 	return (
// 		<Provider store={store}>
// 			<ThemeHandler />
// 			<RouterProvider router={Router} />
// 		</Provider>
// 	);
// }

// export default App;





import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/router';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store/store';
import { fetchCartAsync } from './redux/slices/cartSlice'; // import your thunk for fetching the cart
import '@fontsource/inter';

const ThemeHandler = () => {
	const theme = useSelector((state) => state.theme?.theme); // Add optional chaining to prevent undefined access

	useEffect(() => {
		document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
	}, [theme]);

	return null;
};

// Move the logic for dispatching `fetchCartAsync` into a component
const CartFetcher = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuth);

	useEffect(() => {
		dispatch(fetchCartAsync());
	}, [dispatch, isAuth]);

	return null;
};

function App() {
	return (
		<Provider store={store}>
			<ThemeHandler />
			<CartFetcher /> {/* This will handle the cart fetching logic */}
			<RouterProvider router={Router} />
		</Provider>
	);
}

export default App;





// import { RouterProvider } from 'react-router-dom'
// import Router from './router/router'
// import { Provider } from 'react-redux'
// import store from './redux/store/store'
// import '@fontsource/inter';


// function App() {


// 	return (
// 		<div >
// 			<Provider store={store}>
// 				<RouterProvider router={Router} />
// 			</Provider>
// 		</div>
// 	)
// }

// export default App
