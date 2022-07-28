import React from "react";
import { makeStyles } from "@mui/styles";
import { ThemeColors } from "../../../styles/common";
import { Box, Grid, Paper, Button, Typography, Theme } from "@mui/material";
import sidePanel from "../../../assets/backgrounds/auth-forest-background.png";
import BrandLogo from "../../../assets/branding/logo.png";
import { TextInput } from "../../../components/Input/TextInput";
import { INPUT_TYPE } from "../../../utils";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RiLockLine, RiMailLine } from "react-icons/ri";
import { AUTH_FORM_NAMES } from "../../../constants";

interface IAuthFormData {
	Email: string;
	Password: string;
}

const authStyle = makeStyles((theme: Theme) => ({
	formWrapper: {
		backgroundColor: ThemeColors.modalLight,
		borderRadius: theme.spacing(0.3),
		height: "60vh",
		zIndex: 1,
	},
	sidePanelImage: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
		position: "absolute",
		zIndex: -1,
	},
	brandLogo: {
		objectFit: "contain",
		width: "30%",
		marginTop: theme.spacing(2),
	},
	inputsSpacing: { marginBottom: theme.spacing(2) },
	tabHightLight: {
		color: ThemeColors.primary,
		fontWeight: "bold",
	},
}));

const Auth = () => {
	const { t } = useTranslation();
	const authClasses = authStyle();
	const { handleSubmit, control } = useForm<IAuthFormData>();

	const [isLogin, setIsLogin] = React.useState<boolean>(true);

	const submitFormHandler = (data: { Email: string; Password: string }) => {
		console.log("test");
		console.log(data);
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
			<Grid item md={6} display="flex" className={authClasses.formWrapper}>
				<Grid
					item
					md={5}
					position="relative"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					flexDirection="column"
				>
					<img
						src={sidePanel}
						className={authClasses.sidePanelImage}
						alt="forest side panel"
					/>
					<img
						src={BrandLogo}
						alt="brand logo"
						className={authClasses.brandLogo}
					/>
					<Box>
						<ul style={{ color: ThemeColors.modalLight, marginBottom: "3vh" }}>
							<li>Free Online Notepad</li>
							<li>Simple to use</li>
							<li>Live Share with others</li>
							<li>Public and Private notepads</li>
						</ul>
					</Box>
				</Grid>
				<Grid
					item
					md={8}
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
				>
					<form
						onSubmit={handleSubmit(submitFormHandler)}
						id={AUTH_FORM_NAMES.FORM_NAME}
					>
						<Box display="flex" marginBottom={2}>
							<Typography
								className={isLogin ? authClasses.tabHightLight : ""}
								sx={{ cursor: "pointer" }}
								onClick={() => setIsLogin(true)}
								marginRight={2}
							>
								{t("AUTH.LOGIN")}
							</Typography>
							<Typography
								className={!isLogin ? authClasses.tabHightLight : ""}
								marginRight={2}
								sx={{ cursor: "pointer" }}
								onClick={() => setIsLogin(false)}
							>
								{t("AUTH.REGISTER")}
							</Typography>
						</Box>
						<Box
							className={authClasses.inputsSpacing}
							display="flex"
							alignItems="flex-end"
							justifyContent="center"
						>
							<TextInput
								name={AUTH_FORM_NAMES.EMAIL}
								type={INPUT_TYPE.SINGLE_LINE}
								control={control}
								placeholder="Email"
								addIcon={{ icon: <RiMailLine />, iconSide: "end" }}
							/>
						</Box>
						<Box
							className={authClasses.inputsSpacing}
							display="flex"
							alignItems="flex-end"
							justifyContent="center"
							marginBottom={3}
						>
							<TextInput
								name={AUTH_FORM_NAMES.PASSWORD}
								type={INPUT_TYPE.SINGLE_LINE}
								control={control}
								placeholder="Password"
								secret
								addIcon={{ icon: <RiLockLine />, iconSide: "end" }}
							/>
						</Box>
						<Button
							variant="outlined"
							form={AUTH_FORM_NAMES.FORM_NAME}
							type="submit"
						>
							{isLogin ? t("AUTH.LOGIN") : t("AUTH.REGISTER")}
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Auth;
