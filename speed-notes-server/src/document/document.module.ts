import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { ENTITIES_KEYS } from 'src/constants/index';
import { DocumentSchema } from './document.model';
import { DocumentService } from './document.service';
import { DocumentResolver } from './gql/document.resolver';

@Module({
  providers: [DocumentResolver, DocumentService],
  imports: [
    MongooseModule.forFeature([
      { name: ENTITIES_KEYS.DOCUMENT_MODEL, schema: DocumentSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  exports: [DocumentService],
})
export class DocumentModule {}
