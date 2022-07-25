import {
  SubscribeMessage,
  MessageBody,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, {
  cors: '*',
})
export class DocumentGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('send-document-content')
  handleMessage(
    @MessageBody() document: { documentText: string; documentId: string },
  ): void {
    this.server.emit('updating-document-content', document.documentText);
  }
}
