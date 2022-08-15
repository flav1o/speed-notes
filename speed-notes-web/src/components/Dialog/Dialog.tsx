import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Dialog as MuiDialog,
} from "@mui/material";
import React from "react";

export interface IDialogProps {
	isOpen: boolean;
	title: string;
	buttons: {
		left: { text: string; onClick: () => void };
		right: { text: string; onClick: () => void };
	};
	children: React.ReactNode;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Dialog: React.FC<IDialogProps> = ({
	isOpen,
	title,
	buttons,
	size,
	children,
}) => {
	return (
		<>
			<MuiDialog
				open={isOpen}
				onClose={buttons.left.onClick}
				maxWidth={size ? size : "xs"}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button onClick={buttons.left.onClick}>{buttons.left.text}</Button>
					<Button onClick={buttons.right.onClick} autoFocus>
						{buttons.right.text}
					</Button>
				</DialogActions>
			</MuiDialog>
		</>
	);
};

export { Dialog };
