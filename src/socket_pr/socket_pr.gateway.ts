import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketPrService } from './socket_pr.service';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketRoomDto } from './dto/socket-room.dto';
import { SocketMessageDto } from './dto/socket-message.dto';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
  transports: ['websocket'],
  cookie: true,
})
export class SocketPrGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly socketPrService: SocketPrService,
    private readonly logger: Logger,
  ) {}

  @WebSocketServer() server: Server;

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`[ConnectedAt] ${socket.handshake.address}`);
  }

  @SubscribeMessage('pingpong')
  handlePingPong(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    this.socketPrService.handlePingPong(body, socket);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() body: SocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.socketPrService.handleJoin(body, socket);
  }

  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() body: SocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.socketPrService.handleLeave(body, socket);
  }

  @SubscribeMessage('send')
  handleSend(
    @MessageBody() body: SocketMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(
      `[Send] User: ${socket.id} / Room Name: ${body.roomName} / PayLoad: ${body.payload}`,
    );
    return this.socketPrService.handleSend(body, socket);
  }

  // socket rooms 확인용 핸들러
  // @SubscribeMessage('joinTest')
  // handleJoinTest(@ConnectedSocket() socket: Socket) {
  //   this.server.to('room').emit('joinTestResponse', Array.from(socket.rooms));
  // }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`[DisConnectedAt] ${socket.handshake.address}`);
  }
}
