import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../redux/slices/productSlice';


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ columns }) {
	const dispatch = useDispatch();

	const { products, isProductAdded } = useSelector((state) => state.product);
	console.log(products);

	React.useEffect(() => {
		dispatch(getAllProduct());
	}, []);

	React.useEffect(() => {
		if (isProductAdded) {
			dispatch(getAllProduct());
		}
	}, [isProductAdded, dispatch]);

	return (
		<Paper sx={{ height: 700, width: '100%' }}>
			<DataGrid
				rows={products}
				columns={columns}
				rowHeight={150} 
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[10, 10]}
				sx={{ border: 0  }}
			/>
		</Paper>
	);
}
