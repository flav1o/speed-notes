import { gql } from "@apollo/client";

export const CREATE_DOCUMENT = gql`
	mutation CreateDocument($input: CreateDocumentInput!) {
		CreateDocument(input: $input) {
			_id
		}
	}
`;
