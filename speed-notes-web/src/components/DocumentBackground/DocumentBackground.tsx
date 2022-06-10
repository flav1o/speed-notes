import React from "react";
import image from "../../assets/background.jpg";

const DocumentBackground = () => {
	return <img src={image} style={styles.image} alt="background" />;
};

const styles = {
	image: {
		width: "100%",
		height: "100%",
		position: "fixed" as "fixed",
		zIndex: -1,
	},
};

export default DocumentBackground;
