import React, { useState } from "react";
import { Grid, Theme } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { FIND_USER_DOCUMENTS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import {
	RiDeleteBin5Line,
	RiGitRepositoryPrivateLine,
	RiShareForwardLine,
} from "react-icons/ri";

const mainPageStyles = makeStyles((theme: Theme) => ({
	iconsMargin: {
		margin: "0vh 1vw",
		cursor: "pointer",

		//on active state
		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
}));

export const Main = () => {
	const mainPageStyle = mainPageStyles();
	const columns: GridColDef[] = [
		{
			field: "_id",
			headerName: "Document Identifier",
			width: 300,
			hideSortIcons: true,
			disableColumnMenu: true,
		},
		{
			field: "title",
			headerName: "Name",
			flex: 1,
			hideSortIcons: true,
			disableColumnMenu: true,
		},
		{
			field: "isPublic",
			headerName: "Public",
			width: 200,
			hideSortIcons: true,
			disableColumnMenu: true,
		},
		{
			field: "updatedAt",
			headerName: "Last Update",
			width: 200,
			hideSortIcons: true,
			disableColumnMenu: true,
			renderCell: (params: GridCellParams) => {
				return new Date(params.value).toTimeString();
			},
		},
		{
			field: "actions",
			headerName: "",
			width: 200,
			hideSortIcons: true,
			disableColumnMenu: true,
			align: "right",
			renderCell: (params: GridCellParams) => (
				<>
					<RiShareForwardLine className={mainPageStyle.iconsMargin} size={20} />
					<RiGitRepositoryPrivateLine
						className={mainPageStyle.iconsMargin}
						size={20}
					/>
					<RiDeleteBin5Line className={mainPageStyle.iconsMargin} size={20} />
				</>
			),
		},
	];
	const [rows, setRows] = useState<any>([]);
	useQuery(FIND_USER_DOCUMENTS, {
		onCompleted(data) {
			setRows(data?.FindUserDocuments);
		},
	});

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{
				height: "100vh",
				width: "100vw",
			}}
		>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
				getRowId={(row) => row._id}
				pagination
				sx={{
					backgroundColor: "white",
					height: "50vh",
					maxWidth: "80vw",
				}}
				hideFooter
			/>
		</Grid>
	);
};
