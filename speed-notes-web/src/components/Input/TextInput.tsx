import { TextField, InputAdornment } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { INPUT_TYPE } from "../../utils/index";

interface ITextInputProps {
	name: string;
	type: INPUT_TYPE;
	control: any;
	defaultValue?: string | number;
	inputType: "text" | "number" | "password" | "email";
	placeholder?: string;
	onChange?: (name: string, value: string | number) => void;
	addIcon?: {
		icon: React.ReactElement;
		iconSide: "start" | "end";
		color?: string;
	};
	rules?: any;
	error?: string | boolean;
}

export const TextInput: React.FC<ITextInputProps> = ({
	name,
	control,
	placeholder,
	defaultValue,
	inputType,
	type,
	addIcon,
	rules,
	error,
}) => {
	const input = (onChange: any, value: any, error?: any) => {
		return {
			[INPUT_TYPE.SINGLE_LINE]: (
				<TextField
					placeholder={placeholder}
					name={name}
					onChange={onChange}
					error={!!error}
					value={value}
					label={placeholder}
					variant="standard"
					type={inputType}
					style={{ width: "20vw" }}
					helperText={error ? error : null}
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
					variant="outlined"
					type={inputType}
					error={!!error}
					helperText={error ? error : null}
				/>
			),
		};
	};

	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ?? ""}
			rules={rules}
			render={({ field: { onChange, value } }) =>
				input(onChange, value, error)[type]
			}
		/>
	);
};
