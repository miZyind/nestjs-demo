import { CRUDInterceptor, CRUDRequest, ParsedRequest } from 'nestjs-xion/crud';
import {
  ApiCrudQueries,
  ApiStandardListResponse,
  ApiStandardResponse,
} from 'nestjs-xion/decorator';
import { UUIDParamDTO } from 'nestjs-xion/dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JWTAdminGuard } from '#modules/auth/guards/jwt-admin.guard';
import { SecretGuard } from '#modules/auth/guards/secret.guard';
import { CreateUserDTO } from '#modules/user/dtos/create-user.dto';
import { FormattedUser } from '#modules/user/responses/formatted-user.response';
import { UserService } from '#modules/user/user.service';

@ApiTags('User')
@Controller('protected/users')
export class UserProtectedController {
  constructor(private readonly service: UserService) {}

  @Get()
  @JWTAdminGuard()
  @UseInterceptors(CRUDInterceptor)
  @ApiOperation({ summary: 'Get all users and their todo items' })
  @ApiCrudQueries()
  @ApiStandardListResponse({ type: FormattedUser })
  async getAll(
    @ParsedRequest() req: CRUDRequest,
  ): ReturnType<UserService['getAll']> {
    return this.service.getAll(req);
  }

  @Post()
  @SecretGuard()
  @ApiOperation({ summary: 'Create an admin user' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async createAdmin(@Body() dto: CreateUserDTO): Promise<void> {
    return this.service.createAdmin(dto);
  }

  @Put(':uuid')
  @JWTAdminGuard()
  @ApiOperation({ summary: 'Approve an user creation request' })
  @ApiStandardResponse()
  async approve(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.approve(uuid);
  }

  @Delete(':uuid')
  @JWTAdminGuard()
  @ApiOperation({
    summary: 'Reject an user creation request or ban an user',
  })
  @ApiStandardResponse()
  async reject(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.service.reject(uuid);
  }
}
