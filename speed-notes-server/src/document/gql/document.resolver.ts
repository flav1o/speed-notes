import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DocumentService } from '../document.service';

@Resolver('Document')
export class DocumentResolver {
  constructor(private readonly documentService: DocumentService) {}
}
