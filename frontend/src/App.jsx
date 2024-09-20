import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import './App.css'

function App() {

	return (
		<>
			<div className='w-screen h-screen m-0 p-0 flex items-center justify-center bg-indigo-950	' >
				<RouterProvider router={Router} />
			</div>
		</>
	)
}

export default App
