import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateway } from './document/document.gateway';
import { DocumentModule } from './document/document.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver } from '@nestjs/apollo';
@Module({
  imports: [
    DocumentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/speednotes', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql-schema.ts'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DocumentGateway],
})
export class AppModule {}
