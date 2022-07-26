import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ENTITIES_KEYS } from 'src/constants/index';
import { ProblemSchema } from './document.model';
import { DocumentService } from './document.service';
import { DocumentResolver } from './gql/document.resolver';

@Module({
  providers: [DocumentResolver, DocumentService],
  imports: [
    MongooseModule.forFeature([
      { name: ENTITIES_KEYS.DOCUMENT_MODEL, schema: ProblemSchema },
    ]),
  ],
  exports: [DocumentService],
})
export class DocumentModule {}
