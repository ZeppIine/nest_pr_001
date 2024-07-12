import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SocketRoomDto } from './dto/socket-room.dto';
import { SocketMessageDto } from './dto/socket-message.dto';

@Injectable()
export class SocketPrService {
  handlePingPong(body: any, socket: Socket) {
    socket.emit('pingpongResponse', body);
  }

  handleJoin(body: SocketRoomDto, socket: Socket) {
    socket.join(body.roomName);
    return Array.from(socket.rooms);
  }

  handleLeave(body: SocketRoomDto, socket: Socket) {
    socket.leave(body.roomName);
    return Array.from(socket.rooms);
  }

  handleSend(body: SocketMessageDto, socket: Socket) {
    socket.to(body.roomName).emit('send', body.payload);
    return body;
  }
}
