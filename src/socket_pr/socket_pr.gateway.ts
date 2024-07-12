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

  @SubscribeMessage('test')
  handleTest() {
    return 'hello websocket';
  }

  @SubscribeMessage('pingpong')
  handlePingPong(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
    socket.emit('pingpongResponse', body);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() body: SocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(body.roomName);
    return Array.from(socket.rooms);
  }

  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() body: SocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.leave(body.roomName);
    return Array.from(socket.rooms);
  }

  @SubscribeMessage('send')
  handleSend(
    @MessageBody() body: SocketMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.logger.log(
      `[Send] User: ${socket.id} / Room Name: ${body.roomName} / PayLoad: ${body.payload}`,
    );
    socket.to(body.roomName).emit('send', body.payload);
    return body;
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
