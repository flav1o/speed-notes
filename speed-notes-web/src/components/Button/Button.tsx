import React from "react";
import Lottie from "react-lottie";
import { Button as TButton } from "@mui/material";
import LoadingAnimation from "../../assets/lotties/ButtonLoading.json";

interface IButtonProps {
	onClick: () => void;
	text: string;
	variant?: "contained" | "outlined" | "text";
	disabled?: boolean;
	isLoading?: boolean;
	sx?: any;
}

export const Button: React.FC<IButtonProps> = ({
	onClick,
	text,
	variant,
	disabled,
	isLoading,
	sx,
}) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LoadingAnimation,
		isClickToPauseDisabled: true,
	};

	return (
		<TButton
			onClick={onClick}
			disabled={disabled || isLoading}
			variant={variant ? variant : "contained"}
			sx={sx}
		>
			{isLoading ? (
				<Lottie options={defaultOptions} height={130} width={130} />
			) : (
				text
			)}
		</TButton>
	);
};
