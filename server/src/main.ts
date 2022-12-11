import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { RemovePasswordInterceptor } from './auth/interceptor/auth.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new RemovePasswordInterceptor());
  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      // MEMO: add production
    ],
  });
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => req.header('XSRF-TOKEN') ?? '',
    })
  );
  await app.listen(process.env.PORT || 3300);
}
bootstrap();
