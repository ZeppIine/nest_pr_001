import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SslMiddlePrMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (!req.secure) throw new UpgradeRequiredException();
    next();
  }
}

class UpgradeRequiredException extends HttpException {
  constructor(message: string = 'Upgrade Required') {
    super(message, 426);
  }
}
