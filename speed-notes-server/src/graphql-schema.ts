
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateDocumentInput {
    content: string;
    isLocked: boolean;
    isPublic: boolean;
}

export interface Document {
    _id?: Nullable<string>;
    content?: Nullable<string>;
    isLocked?: Nullable<boolean>;
    isPublic?: Nullable<boolean>;
}

export interface IMutation {
    CreateDocument(input: CreateDocumentInput): Document | Promise<Document>;
}

export interface IQuery {
    FindDocumentById(documentId: string): Document | Promise<Document>;
}

type Nullable<T> = T | null;
