import { gql } from "@apollo/client";

export const DOCUMENT_FIELDS = gql`
	fragment DocumentFields on Document {
		_id
		owner
		title
		isPublic
		isLocked
		createdAt
		updatedAt
		__typename
	}
`;
