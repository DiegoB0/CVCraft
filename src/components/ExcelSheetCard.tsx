import React from 'react';

function ExcelSheetCard({ file, onDelete }) {
	const handleDelete = () => {
		onDelete(file._id);
	};

	return (
		<div className="p-4 rounded-lg bg-base-800 w-[300px] mb-6">
			<div className="text-center">
				<iframe
					src={`https://docs.google.com/viewer?url=${file.url}&embedded=true`}
					className="w-full h-64"
					title="Excel Preview"
				></iframe>
				{file.filename}
			</div>
			<div className="flex gap-4 m-4">
				<a
					href={file.url}
					download
					className="bg-accent-green py-2 px-3 rounded-lg text-lg font-bold hover:bg-emerald-700"
				>
					Descargar
				</a>
				<button
					onClick={handleDelete}
					className="border-2 border-custom-gray py-2 px-3 rounded-lg text-lg font-bold text-custom-gray hover:bg-custom-gray hover:text-custom-mate transition-all duration-300"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}

export default ExcelSheetCard;
