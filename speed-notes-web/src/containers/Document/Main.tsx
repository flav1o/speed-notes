import React, { useState } from "react";
import { Grid, Theme, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { FIND_USER_DOCUMENTS } from "../../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import {
	RiDeleteBin5Line,
	RiGitRepositoryPrivateLine,
	RiShareForwardLine,
} from "react-icons/ri";
import { Dialog } from "../../components";
import { useTranslation } from "react-i18next";
import { DELETE_DOCUMENT } from "../../graphql/mutations";

const mainPageStyles = makeStyles((theme: Theme) => ({
	iconsMargin: {
		margin: "0vh 1vw",
		cursor: "pointer",

		"&:hover": {
			color: theme.palette.primary.main,
		},
	},
	hideRightSeparator: {
		"& > .MuiDataGrid-columnSeparator": {
			visibility: "hidden",
		},
	},
}));

export const Main = () => {
	const [rows, setRows] = useState<any>([]);

	const { t } = useTranslation();
	const mainPageStyle = mainPageStyles();
	const [deleteDocument] = useMutation(DELETE_DOCUMENT);
	const [selectedDocumentId, setSelectedDocumentId] = useState<string>();

	const dataGridSettings = {
		hideSortIcons: true,
		disableColumnMenu: true,
		headerClassName: mainPageStyle.hideRightSeparator,
	};

	const columns: GridColDef[] = [
		{
			field: "_id",
			headerName: "Document Identifier",
			width: 300,
			...dataGridSettings,
		},
		{
			field: "title",
			headerName: "Name",
			flex: 1,
			...dataGridSettings,
		},
		{
			field: "isPublic",
			headerName: "Public",
			width: 200,
			...dataGridSettings,
		},
		{
			field: "updatedAt",
			headerName: "Last Update",
			width: 200,
			...dataGridSettings,
			renderCell: (params: GridCellParams) => {
				return new Date(params.value).toTimeString();
			},
		},
		{
			field: "actions",
			headerName: "",
			width: 200,
			...dataGridSettings,
			align: "right",
			renderCell: (params: GridCellParams) => (
				<>
					<RiShareForwardLine className={mainPageStyle.iconsMargin} size={20} />
					<RiGitRepositoryPrivateLine
						className={mainPageStyle.iconsMargin}
						size={20}
					/>
					<RiDeleteBin5Line
						className={mainPageStyle.iconsMargin}
						size={20}
						onClick={() => {
							setAlertModalVisibility(true);
							setSelectedDocumentId(params.id as string);
						}}
					/>
				</>
			),
		},
	];

	useQuery(FIND_USER_DOCUMENTS, {
		onCompleted(data) {
			setRows(data?.FindUserDocuments);
		},
	});

	const [alertModalVisibility, setAlertModalVisibility] =
		useState<boolean>(false);

	const deleteDocumentHandler = () => {
		deleteDocument({
			variables: {
				documentId: selectedDocumentId,
			},
		})
			.then(() => {
				setAlertModalVisibility(false);
			})
			//TODO: DISPLAY ERROR MODAL
			.catch((err) => console.log(err.message));
	};

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
			<Dialog
				isOpen={alertModalVisibility}
				title={t("DOCUMENT_ALERTS.DELETE_DOCUMENT_TITLE")}
				buttons={{
					left: {
						text: t("MODAL.CANCEL"),
						onClick: () => setAlertModalVisibility(false),
					},
					right: { text: "OK", onClick: () => deleteDocumentHandler() },
				}}
			>
				<Typography variant="body1">
					{t("DOCUMENT_ALERTS.DELETE_DOCUMENT_BODY")}
				</Typography>
			</Dialog>
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
					maxWidth: "70vw",
				}}
				hideFooter
			/>
		</Grid>
	);
};
