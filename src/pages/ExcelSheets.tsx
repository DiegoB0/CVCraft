import ExcelSheetCard from '@/components/ExcelSheetCard';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface ExcelSheet {
	_id: string;
	name: string;
	url: string;
}

function ExcelSheets() {
	const [excelSheets, setExcelSheets] = useState<ExcelSheet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const navigation = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:5000/excelsheets');
				const data = await response.json();
				setExcelSheets(data);
				setLoading(false); // Set loading to false once data is fetched
			} catch (error) {
				console.error('Error fetching Excel sheets:', error);
			}
		};

		fetchData();
	});

	const handleDelete = (fileId) => {
		// Show SweetAlert confirmation dialog
		Swal.fire({
			title: 'Eliminar Hoja de Excel',
			text: 'Seguro de querer eliminarlo?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#52525b',
			confirmButtonText: 'Si, eliminalo',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				// Delete the Excel sheet with the given fileId
				fetch(`http://localhost:5000/deleteFile/${fileId}`, {
					method: 'DELETE',
				})
					.then((response) => response.json())
					.then((data) => {
						console.log('Excel sheet deleted:', data);
						// Remove the deleted Excel sheet from the state
						setExcelSheets((prevState) =>
							prevState.filter((sheet) => sheet._id !== fileId)
						);
					})
					.catch((error) =>
						console.error('Error deleting Excel sheet:', error)
					);
			}
		});
	};

	if (loading) {
		return <div className="p-8">Loading...</div>; // Render loading indicator while fetching data
	}

	return (
		<div className="text-2xl text-custom-light md:p-8 p-6">
			<h2>Tus Hojas de Excel</h2>
			<div className="grid grid-cols-3 gap-2 my-10">
				{excelSheets.map((sheet) => (
					<ExcelSheetCard
						key={sheet._id}
						file={sheet}
						onDelete={handleDelete}
					/>
				))}
			</div>
			<Button
				className="text-lg font-bold w-full border-2 border-accent-yellow text-custom-mate bg-base-900 hover:bg-accent-yellow transition-all duration-300 hover:text-base-900"
				onClick={() => navigation('/excelsheets/new')}
			>
				Importar Excel
			</Button>
		</div>
	);
}

export default ExcelSheets;
