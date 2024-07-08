import { SslMiddlePrMiddleware } from './ssl_middle_pr.middleware';

describe('SslMiddlePrMiddleware', () => {
  it('should be defined', () => {
    expect(new SslMiddlePrMiddleware()).toBeDefined();
  });
});
