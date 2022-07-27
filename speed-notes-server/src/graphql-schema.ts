
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

export interface CreateUserInput {
    exampleField?: Nullable<number>;
}

export interface UpdateUserInput {
    id: number;
}

export interface Document {
    _id?: Nullable<string>;
    content?: Nullable<string>;
    isLocked?: Nullable<boolean>;
    isPublic?: Nullable<boolean>;
}

export interface IMutation {
    CreateDocument(input: CreateDocumentInput): Document | Promise<Document>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IQuery {
    FindDocumentById(documentId: string): Document | Promise<Document>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    _id: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

type Nullable<T> = T | null;
