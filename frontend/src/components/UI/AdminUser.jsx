import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/slices/authSlice';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const UsersList = () => {
	const dispatch = useDispatch();
	const { users, isLoading, error } = useSelector((state) => state.auth);

	const theme = useSelector((state) => state.theme?.theme);


	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;


	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'name', headerName: 'Name', width: 200 },
		{ field: 'email', headerName: 'Email', width: 300 },
		{ field: 'role', headerName: 'Role', width: 150 },
		{ field: 'phoneNumber', headerName: 'Mobile Number', width: 180 },
	];



	const rows = users.map((user, index) => ({
		id: index + 1, 
		name: user.name,
		email: user.email,
		role: user.role,
		phoneNumber: user.phoneNumber || 'N/A',
	}));

	return (
		// <div className="w-auto h-screen bg-gray-100 py-8">
		<div className={`w-auto h-screen bg-gray-100 py-8 
			${theme === 'light' ? 'text-black' : 'bg-inherit text-black'}`}>

			<div className="w-[90%] mx-auto bg-white p-6 rounded-lg shadow-2xl">
				<h1 className="text-2xl font-lato font-bold mb-4 text-left">All Users</h1>

				<Box className="bg-white" sx={{ height: 700, width: '100%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 10,
								},
							},
						}}
						pageSizeOptions={[7]}
						disableRowSelectionOnClick
						className="bg-white"
					/>
				</Box>
			</div>
		</div>
	);
};

export default UsersList;
