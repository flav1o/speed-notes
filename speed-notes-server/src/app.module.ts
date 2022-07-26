import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateway } from './document/document.gateway';
import { DocumentModule } from './document/document.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DocumentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/speednotes', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DocumentGateway],
})
export class AppModule {}
