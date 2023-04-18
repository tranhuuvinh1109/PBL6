import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";

const Back = () => {
	const navigate = useNavigate();

	return (
		<Container className="text-left">
			<button className="btn-back"
				onClick={ () => navigate(-1) }
			>
				<FontAwesomeIcon icon={ faChevronLeft } /> Back
			</button>
		</Container>
	)
}

export default Back;