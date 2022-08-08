import React from "react";
import Lottie from "react-lottie";
import { Button as TButton } from "@mui/material";
import LoadingAnimation from "../../assets/lotties/ButtonLoading.json";

interface IButtonProps {
	onClick: () => void;
	text: string;
	disabled?: boolean;
	isLoading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
	onClick,
	text,
	disabled,
	isLoading,
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
			onDoubleClick={() => console.log("asd")}
		>
			{isLoading ? (
				<Lottie options={defaultOptions} height={130} width={130} />
			) : (
				text
			)}
		</TButton>
	);
};
