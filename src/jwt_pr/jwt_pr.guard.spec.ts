import { JwtPrGuard } from './jwt_pr.guard';

describe('JwtPrGuard', () => {
  it('should be defined', () => {
    expect(new JwtPrGuard()).toBeDefined();
  });
});
