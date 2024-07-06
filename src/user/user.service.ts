import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.insert(newUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user || !bcrypt.compareSync(loginDto.password, user.password))
      throw new UnauthorizedException('Login Failed');

    const accessToken = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id: user.id,
        username: user.username,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return { user, accessToken, refreshToken };
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
