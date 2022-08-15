import React, { useState } from "react";
import { Grid, Theme, Typography, Box, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { FIND_USER_DOCUMENTS } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import {
	RiDeleteBin5Line,
	RiGitRepositoryPrivateLine,
	RiShareForwardLine,
} from "react-icons/ri";
import { Button, Dialog } from "../components";
import { useTranslation } from "react-i18next";
import { DELETE_DOCUMENT, CREATE_DOCUMENT } from "../graphql/mutations";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import bg from "../assets/backgrounds/wl.jpg";

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
	enabledPointerCursor: {
		cursor: "pointer",
	},
}));

export const Main = () => {
	const history = useHistory();
	const { t } = useTranslation();
	const mainPageStyle = mainPageStyles();

	const [rows, setRows] = useState<any>([]);
	const [deleteDocument] = useMutation(DELETE_DOCUMENT);
	const [selectedDocumentId, setSelectedDocumentId] = useState<string>();
	const [alertModalVisibility, setAlertModalVisibility] =
		useState<boolean>(false);

	const [createDocument] = useMutation(CREATE_DOCUMENT);
	const [documentName, setDocumentName] = useState<string>();
	const [createDocumentModalVisibility, setCreateDocumentModalVisibility] =
		useState<boolean>(false);

	useQuery(FIND_USER_DOCUMENTS, {
		onCompleted(data) {
			setRows(data?.FindUserDocuments);
		},
	});

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
					<CopyToClipboard text={params?.id as string}>
						<RiShareForwardLine
							className={mainPageStyle.iconsMargin}
							size={20}
						/>
					</CopyToClipboard>
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

	const deleteDocumentHandler = () => {
		deleteDocument({
			variables: {
				documentId: selectedDocumentId,
			},
			onCompleted: () => {
				setAlertModalVisibility(false);
			},
			onError: (error) => {
				console.log(error.message);
			},
		});
	};

	const createDocumentHandler = () => {
		createDocument({
			variables: {
				input: {
					title: documentName,
					isPublic: true,
					isLocked: false,
				},
			},
			onCompleted: (res) => console.log(res),
			onError: (err) => console.log(err),
		});
	};

	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
				sx={{
					height: "100vh",
					width: "100vw",
					backgroundImage: `url(${bg})`,
					backgroundSize: "cover",
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

				<Dialog
					isOpen={createDocumentModalVisibility}
					title={t("DOCUMENT_ALERTS.CREATE_DOCUMENT_TITLE")}
					buttons={{
						left: {
							text: t("MODAL.CANCEL"),
							onClick: () => setCreateDocumentModalVisibility(false),
						},
						right: { text: "OK", onClick: () => createDocumentHandler() },
					}}
				>
					<Box display="flex" flexDirection="column">
						<TextField
							label={t("MODAL.CREATE_DOCUMENT.INPUT_NAME")}
							variant="standard"
							onChange={(e) => setDocumentName(e.target.value)}
						/>
					</Box>
				</Dialog>

				<Box
					sx={{ width: "70vw", height: "60vh" }}
					display="flex"
					alignItems="end"
					flexDirection="column"
				>
					<Box>
						<Button
							onClick={() => setCreateDocumentModalVisibility(true)}
							text={t("BUTTONS.CREATE_DOCUMENT")}
							sx={{ margin: "2vh 0vw 2vh 1vw" }}
						/>
					</Box>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
						getRowId={(row) => row._id}
						disableSelectionOnClick
						pagination
						hideFooter
						onCellClick={(e) =>
							e.field === "_id" && history.push(`/document/${e.id}`)
						}
						sx={{
							backgroundColor: "white",
							maxHeight: "60vh",
							width: "70vw",
						}}
					/>
				</Box>
			</Grid>
		</>
	);
};
