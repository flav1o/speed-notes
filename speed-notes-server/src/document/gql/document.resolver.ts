import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateDocumentInput, Document } from 'src/graphql/graphql-schema';
import { DocumentService } from '../document.service';

@Resolver('Document')
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @Mutation('CreateDocument')
  createDocument(
    @Args('input') document: CreateDocumentInput,
  ): Promise<Document> {
    return this.documentService.createDocument(document);
  }
}
