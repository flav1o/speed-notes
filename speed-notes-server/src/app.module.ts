import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateway } from './document/document.gateway';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [DocumentModule],
  controllers: [AppController],
  providers: [AppService, DocumentGateway],
})
export class AppModule {}
