import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
