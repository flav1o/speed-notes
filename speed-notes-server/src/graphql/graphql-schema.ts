
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateDocumentInput {
    content: string;
    isLocked: boolean;
    isPublic: boolean;
}

export class Document {
    _id?: Nullable<string>;
    content?: Nullable<string>;
    isLocked?: Nullable<boolean>;
    isPublic?: Nullable<boolean>;
}

export abstract class IMutation {
    abstract CreateDocument(input: CreateDocumentInput): Document | Promise<Document>;
}

export abstract class IQuery {
    abstract FindDocumentById(documentId: string): Document | Promise<Document>;

    abstract confirmUser(email: string, token: string): User | Promise<User>;
}

export class User {
    _id: string;
    email: string;
    password: string;
    confirmationCode: string;
    confirmed: boolean;
}

type Nullable<T> = T | null;
