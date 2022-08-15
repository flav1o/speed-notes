import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ThemeColors } from "../../styles/common";
import { Box, Grid, Button, Typography, Theme, TextField } from "@mui/material";
import sidePanel from "../../assets/backgrounds/auth-forest-background.png";
import BrandLogo from "../../assets/branding/logo.png";
import { TextInput, Dialog } from "../../components/index";
import { INPUT_TYPE } from "../../types";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RiLockLine, RiMailLine } from "react-icons/ri";
import { AUTH_FORM_NAMES, AUTH_LOCAL_STORAGE_TOKEN } from "../../constants";
import { AuthService } from "../../services";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/auth";

interface IAuthFormData {
	email: string;
	password: string;
}

interface IAccConfirmationData {
	email: string;
	confirmationCode: string;
	isModalVisible: boolean;
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
	const { handleSubmit, control, reset } = useForm<IAuthFormData>();
	const dispatch = useDispatch();

	const [error, setError] = useState<string | undefined>(undefined);
	const [accConfirmationError, setAccConfirmationError] = useState<
		string | undefined
	>(undefined);
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [accConfirmation, setAccConfirmation] =
		React.useState<IAccConfirmationData>({
			confirmationCode: "",
			email: "",
			isModalVisible: false,
		});

	const submitFormHandler = (formData: IAuthFormData) => {
		const { email, password } = formData;

		if (!isLogin)
			return AuthService.register(email, password)
				.then(() => {
					reset();
					setIsLogin(true);
				})
				.catch((e) => setError(e?.response?.data.message));

		AuthService.login(email, password)
			.then((res) => {
				localStorage.setItem(AUTH_LOCAL_STORAGE_TOKEN, res.data.accessToken);
				dispatch(authActions.authenticate(res.data.email));
			})
			.catch((e) => {
				if (e?.response?.data.message === "AUTH.USER_NOT_CONFIRMED")
					return setAccConfirmation((prev) => ({
						...prev,
						isModalVisible: true,
						email,
					}));
			});
	};

	const onAccConfirmation = (email: string, confirmationCode: string) => {
		AuthService.confirmAccount(email, confirmationCode)
			.then(() => {
				setAccConfirmationError(undefined);
				setAccConfirmation((prev) => ({
					...prev,
					isModalVisible: false,
				}));
			})
			.catch((e) => {
				setAccConfirmationError(e?.response?.data.message);
				console.log(e?.response?.data.message);
			});
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
				isOpen={accConfirmation.isModalVisible}
				buttons={{
					left: {
						text: t("AUTH.RESEND_CODE"),
						onClick: () => {
							setAccConfirmation((prev) => ({
								...prev,
								isModalVisible: true,
							}));
						},
					},
					right: {
						text: t("AUTH.CONFIRM_ACCOUNT"),
						onClick: () =>
							onAccConfirmation(
								accConfirmation.email,
								accConfirmation.confirmationCode
							),
					},
				}}
				title={t("AUTH.INSERT_CONFIRMATION_CODE")}
			>
				<TextField
					fullWidth
					placeholder={t("AUTH.CONFIRMATION_CODE")}
					error={!!accConfirmationError}
					onChange={(e) =>
						setAccConfirmation((prev) => ({
							...prev,
							confirmationCode: e.target.value,
						}))
					}
				/>
			</Dialog>
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
								rules={{
									required: t("GENERAL.REQUIRED_FIELD") as string,
								}}
								control={control}
								placeholder="Email"
								addIcon={{ icon: <RiMailLine />, iconSide: "end" }}
								inputType="email"
								error={!!error && " "}
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
								inputType="password"
								addIcon={{ icon: <RiLockLine />, iconSide: "end" }}
								error={error}
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
