import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '#entities/user.entity';
import { UserProtectedController } from '#modules/user/user.protected.controller';
import { UserPublicController } from '#modules/user/user.public.controller';
import { UserService } from '#modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserProtectedController, UserPublicController],
  exports: [UserService],
})
export class UserModule {}
