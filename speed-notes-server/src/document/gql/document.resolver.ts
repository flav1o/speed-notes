import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/common/decorators/getCurrentUser';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  CreateDocumentInput,
  Document,
  User,
} from 'src/graphql/graphql-schema';
import { DocumentService } from '../document.service';

@Resolver('Document')
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(AuthGuard)
  @Mutation('CreateDocument')
  createDocument(
    @Args('input') document: CreateDocumentInput,
    @CurrentUser() user: User,
  ): Promise<Document> {
    return this.documentService.createDocument(document, user.email);
  }

  @UseGuards(AuthGuard)
  @Query('FindUserDocuments')
  findUserDocuments(@CurrentUser() user: User): Promise<Document[]> {
    return this.documentService.findDocumentsByOwner(user.email);
  }

  @UseGuards(AuthGuard)
  @Mutation('DeleteDocumentById')
  deleteDocumentById(
    @Args('documentId') documentId: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.documentService.deleteDocumentById(documentId, user.email);
  }
}
