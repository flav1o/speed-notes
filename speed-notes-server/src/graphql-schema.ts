
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateDocumentInput {
    isLocked: boolean;
    isPublic: boolean;
    title: string;
}

export interface Document {
    _id?: Nullable<string>;
    owner?: Nullable<string>;
    content?: Nullable<string>;
    isLocked?: Nullable<boolean>;
    isPublic?: Nullable<boolean>;
    title?: Nullable<string>;
    ableToEdit?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface IMutation {
    CreateDocument(input: CreateDocumentInput): Document | Promise<Document>;
    DeleteDocumentById(documentId: string): boolean | Promise<boolean>;
}

export interface IQuery {
    FindDocumentById(documentId: string): Document | Promise<Document>;
    FindUserDocuments(): Nullable<Document>[] | Promise<Nullable<Document>[]>;
    confirmUser(email: string, token: string): User | Promise<User>;
}

export interface User {
    _id: string;
    email: string;
    password: string;
    confirmationCode: string;
    confirmed: boolean;
}

type Nullable<T> = T | null;
