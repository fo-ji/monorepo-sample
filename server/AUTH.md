### install packages
```zsh
$ docker-compose up -d
$ docker exec -it server sh
$ cd ..
$ yarn server add @nestjs/jwt @nestjs/passport cookie-parser csurf passport passport-jwt bcrypt class-validator class-transformer
$ yarn server add -D @types/express @types/cookie-parser @types/csurf @types/passport-jwt @types/bcrypt
```

### create module, controller, service
```zsh
$ cd server
$ nest g module auth
$ nest g module user
$ nest g module prisma
$ nest g controller auth --no-spec
$ nest g controller user --no-spec
$ nest g service auth --no-spec
$ nest g service user --no-spec
$ nest g service prisma --no-spec
```

### add User model & migrate
```prisma
model User {
  id String @id @default(uuid())
  email String @unique
  name String
  password String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
```zsh
$ npx prisma migrate dev
$ npx prisma studio
$ npx prisma generate
```

### edit bootstrap
```diff
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
+ import { ValidationPipe } from '@nestjs/common';
+ import { Request } from 'express';
+ import * as cookieParser from 'cookie-parser';
+ import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
+  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
+  app.enableCors({
+    credentials: true,
+    origin: [
+      'http://localhost:3000',
+      // MEMO: add production
+    ],
+  });
+  app.use(cookieParser());
+  app.use(
+    csurf({
+      cookie: {
+        httpOnly: true,
+        sameSite: 'none',
+        secure: true,
+      },
+      // value: (req: Request) => req.header('csrf-token'),
+      // value: (req: Request) => req.csrfToken(),
+    })
+  );
+  await app.listen(process.env.PORT || 3300);
}
bootstrap();
```