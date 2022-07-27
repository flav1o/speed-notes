import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ENTITIES_KEYS } from 'src/constants';
import { CreateDocumentInput, Document } from 'src/graphql/graphql-schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(ENTITIES_KEYS.DOCUMENT_MODEL)
    private readonly documentModel: Model<Document>,
  ) {}

  async createDocument(document: CreateDocumentInput): Promise<Document> {
    const create = new this.documentModel({
      ...document,
    });

    return create.save();
  }

  async findDocumentById(documentId: string): Promise<Document> {
    const document: Document = await this.documentModel.findById(documentId);

    if (!document)
      throw new HttpException('DOC.NOT_FOUND', HttpStatus.NOT_FOUND);

    return document;
  }
}
