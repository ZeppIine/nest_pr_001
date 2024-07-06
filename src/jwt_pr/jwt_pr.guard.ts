import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AccessToken, RefreshToken } from 'src/constant/constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtPrGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const accessToken = request.cookies[AccessToken];
    const refreshToken = request.cookies[RefreshToken];

    if (!accessToken) throw new ForbiddenException('token not found');
    try {
      const decodedAccessToken = this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });

      const user = await this.userService.findOne(decodedAccessToken.id);

      request.user = user;

      return true;
    } catch (accessTokenError) {
      try {
        const decodedRefreshToken = this.jwtService.verify(refreshToken, {
          secret: this.configService.get('JWT_SECRET'),
        });

        const user = await this.userService.findOne(decodedRefreshToken.id);

        request.user = user;

        const newAccessToken = await this.jwtService.signAsync(
          {
            id: user.id,
            username: user.username,
          },
          {
            expiresIn: '1h',
            secret: this.configService.get('JWT_SECRET'),
          },
        );

        response.cookie(AccessToken, newAccessToken, { httpOnly: true });

        return true;
      } catch (refreshTokenError) {
        response.clearCookie(AccessToken).clearCookie(RefreshToken);

        throw new UnauthorizedException('token expired');
      }
    }
  }
}
