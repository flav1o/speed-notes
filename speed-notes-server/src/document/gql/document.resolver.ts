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
}
