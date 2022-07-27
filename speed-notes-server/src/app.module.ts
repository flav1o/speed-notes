import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateway } from './document/document.gateway';
import { DocumentModule } from './document/document.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DocumentModule,
    UsersModule,
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DocumentGateway],
})
export class AppModule {}
