import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8001, {
  cors: '*',
})
export class DocumentGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('join-document')
  handleJoinRoom(
    @MessageBody() documentId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(documentId);
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
