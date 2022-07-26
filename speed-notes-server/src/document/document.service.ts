import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentInput, Document } from 'src/graphql/graphql-schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel('document')
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
    return document;
  }
}
