import { gql } from "@apollo/client";
import { DOCUMENT_FIELDS } from "../fragments/index";

export const FIND_USER_DOCUMENTS = gql`
	${DOCUMENT_FIELDS}
	query FindUserDocuments {
		FindUserDocuments {
			...DocumentFields
		}
	}
`;
