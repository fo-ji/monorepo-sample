import { User } from '@prisma/client';

export interface AuthUser {
  accessToken: string;
  user: User;
}

export interface Csrf {
  csrfToken: string;
}
