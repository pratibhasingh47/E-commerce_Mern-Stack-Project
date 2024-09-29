import React, { useState } from 'react'
import DataTable from './Datatable'
import ModelComponent from './ModalComponent'
import { FaEdit } from "react-icons/fa";
import { toggleTheme } from '../../redux/slices/themesSlice';
import { useSelector } from 'react-redux';



const AdminProduct = () => {
	const [open, setOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [rowData, setRowData] = useState(null);
	const handleUpdateModel = (data) => {
		setRowData(data);
		setOpen(true);
		setIsUpdate(true);
	}

	const theme = useSelector((state) => state.theme?.theme);


	const addRowData = {
		name: "",
		price: "",
		decription: "",
		category: ""
	}
	const columns = [
		{ field: 'id', headerName: 'ID', width: 70, },
		{
			field: 'productUrl', headerName: 'Product Image', width: 100, renderCell: (params) => {
				return (
					<div className='flex  items-center h-full'><img src={`http://localhost:5000/${params.row.productUrl}`} alt="" className='w-14 h-auto' /></div>
				)
			}
		},
		{ field: 'name', headerName: 'Product name', width: 200 },
		{ field: 'category', headerName: 'Category', width: 190 },
		{
			field: 'description',
			headerName: 'Description',
			width: 400,

		},
		{ field: 'price', headerName: 'price', width: 150 },
		{
			field: 'action', headerName: 'Action', width: 100, renderCell: (params) => {
				return (
					<div className='flex justify-center items-center h-full cursor-pointer  '>
						<div className='w-1/2 h-4/5 flex justify-center items-center hover:bg-black hover:text-white rounded-full' onClick={() => { handleUpdateModel(params.row) }}>
							<FaEdit className='text-2xl' />
						</div>

					</div>
				)
			}
		},
	];
	return (
		<div className=''>
			<div className='flex justify-between p-4 m-4'>
				<div><p className='text-2xl font-semibold'>
					Products
				</p></div>
				<div>
					<button
						className={`mt-2 p-2 border-2 text-xl font-lato cursor-pointer 
						${theme === 'light' ? 'border-gray-800 bg-white text-black hover:bg-black hover:text-white' : 'border-gray-200 bg-gray-800 text-white hover:bg-white hover:text-black'}`}
						onClick={() => {
							setRowData(addRowData);
							setIsUpdate(false);
							setOpen(true)
						}} >Add Product</button>
				</div>
			</div>
			<div className='m-4 p-4'>
				<DataTable columns={columns} />
			</div>
			<ModelComponent open={open} setOpen={setOpen} isUpdate={isUpdate} row={rowData} />

		</div>
	)
}

export default AdminProduct