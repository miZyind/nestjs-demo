import { CRUDInterceptor, CRUDRequest, ParsedRequest } from 'nestjs-xion/crud';
import {
  ApiCrudQueries,
  ApiStandardListResponse,
  ApiStandardResponse,
  User,
} from 'nestjs-xion/decorator';
import { UUIDParamDTO } from 'nestjs-xion/dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JWTAdminGuard } from '#modules/auth/guards/jwt-admin.guard';
import { SecretGuard } from '#modules/auth/guards/secret.guard';
import { JWTUserPayload } from '#modules/auth/strategies/jwt.strategy';
import { TermsOfServiceService } from '#modules/terms-of-service/terms-of-service.service';
import { UserService } from '#modules/user/user.service';
import { AdminCreateAdminUserDTO } from '#platforms/admin/dtos/create-admin-user.dto';
import { AdminUpsertTermsOfServiceDTO } from '#platforms/admin/dtos/upsert-terms-of-service.dto';
import { AdminFormattedUser } from '#platforms/admin/responses/formatted-user.response';
import { AdminUpsertTermsOfServiceResponse } from '#platforms/admin/responses/upsert-terms-of-service.response';

@ApiTags('Platform [Admin]')
@Controller('protected/admin')
export class AdminProtectedController {
  constructor(
    private readonly userService: UserService,
    private readonly tosService: TermsOfServiceService,
  ) {}

  @Post('admin-users')
  @SecretGuard()
  @ApiOperation({ summary: 'Create an admin user' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async createAdmin(@Body() dto: AdminCreateAdminUserDTO): Promise<void> {
    return this.userService.createAdmin(dto);
  }

  @Get('users')
  @JWTAdminGuard()
  @UseInterceptors(CRUDInterceptor)
  @ApiOperation({ summary: 'Get all users and their todo items' })
  @ApiCrudQueries()
  @ApiStandardListResponse({ type: AdminFormattedUser })
  async getAllUsers(
    @ParsedRequest() req: CRUDRequest,
  ): ReturnType<UserService['getAll']> {
    return this.userService.getAll(req);
  }

  @Patch('users/:uuid')
  @JWTAdminGuard()
  @ApiOperation({ summary: 'Approve an user creation request' })
  @ApiStandardResponse()
  async approveUser(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.userService.approve(uuid);
  }

  @Delete('users/:uuid')
  @JWTAdminGuard()
  @ApiOperation({ summary: 'Reject an user creation request or ban an user' })
  @ApiStandardResponse()
  async rejectUser(@Param() { uuid }: UUIDParamDTO): Promise<void> {
    return this.userService.reject(uuid);
  }

  @Put('terms-of-services')
  @JWTAdminGuard()
  @ApiOperation({ summary: 'Upsert terms of service' })
  @ApiStandardResponse({ type: AdminUpsertTermsOfServiceResponse })
  async upsertTermsOfServices(
    @User() { uuid: operatorUUID }: JWTUserPayload,
    @Body() dto: AdminUpsertTermsOfServiceDTO,
  ): ReturnType<TermsOfServiceService['upsert']> {
    return this.tosService.upsert(operatorUUID, dto);
  }
}
