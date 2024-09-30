import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './router/router';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store/store';
import '@fontsource/inter';

const ThemeHandler = () => {
	const theme = useSelector((state) => state.theme?.theme); // Add optional chaining to prevent undefined access

	useEffect(() => {
		document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
	}, [theme]);

	return null; 
};

function App() {
	return (
		<Provider store={store}>
			<ThemeHandler />
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
