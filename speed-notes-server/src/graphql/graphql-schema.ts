
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

export class CreateUserInput {
    exampleField?: Nullable<number>;
}

export class UpdateUserInput {
    id: number;
}

export class Document {
    _id?: Nullable<string>;
    content?: Nullable<string>;
    isLocked?: Nullable<boolean>;
    isPublic?: Nullable<boolean>;
}

export abstract class IMutation {
    abstract CreateDocument(input: CreateDocumentInput): Document | Promise<Document>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IQuery {
    abstract FindDocumentById(documentId: string): Document | Promise<Document>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    _id: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

type Nullable<T> = T | null;
