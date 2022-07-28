import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { INPUT_TYPE } from "../../utils/index";

interface ITextInputProps {
	name: string;
	type: INPUT_TYPE;
	control: any;
	defaultValue?: string | number;
	secret?: boolean;
	placeholder?: string;
	onChange?: (name: string, value: string | number) => void;
	addIcon?: {
		icon: React.ReactElement;
		iconSide: "start" | "end";
		color?: string;
	};
}

export const TextInput: React.FC<ITextInputProps> = ({
	name,
	control,
	placeholder,
	defaultValue,
	secret,
	type,
	addIcon,
}) => {
	const input = (onChange: any, value: any) => {
		return {
			[INPUT_TYPE.SINGLE_LINE]: (
				<TextField
					required
					placeholder={placeholder}
					name={name}
					onChange={onChange}
					value={value}
					label={placeholder}
					variant="standard"
					type={secret ? "password" : "text"}
					style={{ width: "20vw" }}
					InputProps={
						addIcon?.iconSide === "start"
							? {
									startAdornment: (
										<InputAdornment position="start">
											{addIcon?.icon}
										</InputAdornment>
									),
							  }
							: {
									endAdornment: (
										<InputAdornment position="end">
											{addIcon?.icon}
										</InputAdornment>
									),
							  }
					}
				/>
			),
			[INPUT_TYPE.MULTI_LINE]: (
				<TextField
					placeholder={placeholder}
					name={name}
					onChange={onChange}
					value={value}
					label={placeholder}
					variant="standard"
					type={secret ? "password" : "text"}
				/>
			),
		};
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ?? ""}
			render={({ field: { onChange, value } }) => input(onChange, value)[type]}
		/>
	);
};
