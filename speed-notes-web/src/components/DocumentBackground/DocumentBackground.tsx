import React from "react";

const DocumentBackground = () => {
	return (
		<img
			src={"https://w.wallhaven.cc/full/z8/wallhaven-z8odwg.jpg"}
			style={styles.image}
			alt="background"
		/>
	);
};

const styles = {
	image: {
		width: "100%",
		height: "100",
		position: "fixed" as "fixed",
		zIndex: -1,
		objectFit: "cover" as "cover",
	},
};

export default DocumentBackground;
