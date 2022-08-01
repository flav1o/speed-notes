import { HttpException } from '@nestjs/common';
import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Document } from 'src/graphql/graphql-schema';
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
    this.documentService
      .findDocumentById(clientDocumentId)
      .then((res: Document) => {
        client.join(clientDocumentId);
        client.emit('updating-document-content', res.content);
      })
      .catch((err: HttpException) => client.emit('exception', err));
  }

  @SubscribeMessage('send-document-content')
  handleDocumentText(
    @ConnectedSocket() client: Socket,
    @MessageBody() document: { documentText: string; documentId: string },
  ): void {
    const { documentId, documentText } = document;
    this.documentService.updateDocumentContent(documentId, documentText);
    client.to(documentId).emit('updating-document-content', documentText);
  }
}
