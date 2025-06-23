export class InsertSessionDTO {
  userId: string;
  token: string;
  expiredAt: Date;
  ipAddress?: string;
  userAgent?: string;
  status?: 'ACTIVE' | 'EXPIRED' | 'REVOKED';

  constructor({
    userId,
    token,
    expiredAt,
    ipAddress,
    userAgent,
    status,
  }: {
    userId: string;
    token: string;
    expiredAt: Date;
    ipAddress?: string;
    userAgent?: string;
    status?: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  }) {
    this.userId = userId;
    this.token = token;
    this.expiredAt = expiredAt;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.status = status;
  }
}
