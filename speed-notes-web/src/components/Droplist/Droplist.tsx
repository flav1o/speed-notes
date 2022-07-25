import React from "react";
import { Select, MenuItem } from "@mui/material";

export const Droplist = () => {
	return (
		<Select
			labelId="demo-simple-select-label"
			id="demo-simple-select"
			// value={age}
			label="Age"
			// onChange={handleChange}
		>
			<MenuItem value={10}>Ten</MenuItem>
			<MenuItem value={20}>Twenty</MenuItem>
			<MenuItem value={30}>Thirty</MenuItem>
		</Select>
	);
};
