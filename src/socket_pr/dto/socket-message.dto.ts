import { PickType } from '@nestjs/mapped-types';
import { SocketRoomDto } from './socket-room.dto';

export class SocketMessageDto extends PickType(SocketRoomDto, ['roomName']) {
  payload: string;
}
