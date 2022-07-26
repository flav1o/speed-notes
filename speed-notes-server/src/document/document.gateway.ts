import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CreateDocumentInput, Document } from 'src/graphql/graphql-schema';
import { DocumentService } from './document.service';

@WebSocketGateway(8001, {
  cors: '*',
})
export class DocumentGateway {
  constructor(private readonly documentService: DocumentService) {}

  @WebSocketServer()
  server;

  @SubscribeMessage('join-document')
  async handleJoinRoom(
    @MessageBody() clientDocumentId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const documentContent: Document =
      await this.documentService.findDocumentById(clientDocumentId);

    client.join(clientDocumentId);
    client
      .to(clientDocumentId)
      .emit('updating-document-content', documentContent.content);
  }

  @SubscribeMessage('send-document-content')
  handleDocumentText(
    @ConnectedSocket() client: Socket,
    @MessageBody() document: { documentText: string; documentId: string },
  ): void {
    client
      .to(document.documentId)
      .emit('updating-document-content', document.documentText);
  }
}
