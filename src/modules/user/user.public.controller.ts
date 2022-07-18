import { ApiStandardResponse } from 'nestjs-xion/decorator';

import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from '#modules/user/dtos/create-user.dto';
import { UserService } from '#modules/user/user.service';

@ApiTags('User')
@Controller('public/users')
export class UserPublicController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async register(@Body() dto: CreateUserDTO): Promise<void> {
    return this.service.register(dto);
  }
}
