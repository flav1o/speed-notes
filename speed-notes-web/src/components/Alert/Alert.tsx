import React, { useEffect } from "react";
import { Alert as MuiAlert, AlertTitle, Collapse } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import { alertActions } from "../../store/reducers/alert";

const Alert = () => {
	const dispatch = useDispatch();
	const {
		variant,
		severity,
		title,
		message,
		isVisible,
		autoCloseTimeInSeconds,
	} = useAppSelector((state) => state.alert);

	useEffect(() => {
		setTimeout(
			() => dispatch(alertActions.hideAlert()),

			autoCloseTimeInSeconds ? autoCloseTimeInSeconds : 1000
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Collapse in={isVisible}>
				<MuiAlert
					variant={variant ? variant : "outlined"}
					severity={severity}
					sx={{
						position: "fixed",
						top: "2vh",
						right: "2vh",
					}}
				>
					{title && <AlertTitle>{title}</AlertTitle>}
					{message}
				</MuiAlert>
			</Collapse>
		</>
	);
};

export { Alert };
