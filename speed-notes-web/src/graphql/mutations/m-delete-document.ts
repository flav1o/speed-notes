import { gql } from "@apollo/client";

export const DELETE_DOCUMENT = gql`
	mutation DeleteDocumentById($documentId: String!) {
		DeleteDocumentById(documentId: $documentId)
	}
`;
