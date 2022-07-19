import { ApiStandardResponse } from 'nestjs-xion/decorator';

import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LocaleCode } from '#app/app.constant';
import { TermsOfServiceService } from '#modules/terms-of-service/terms-of-service.service';
import { UserService } from '#modules/user/user.service';
import { WebRegisterDTO } from '#platforms/web/dtos/register.dto';
import { WebGetLatestTermsOfServiceResponse } from '#platforms/web/responses/get-latest-terms-of-service.response';
import { ApiLocale, Locale } from '#utils/locale.decorator';

@ApiTags('Platform [Web]')
@Controller('public/web')
export class WebPublicController {
  constructor(
    private readonly userService: UserService,
    private readonly tosService: TermsOfServiceService,
  ) {}

  @Get('terms-of-services/latest')
  @ApiLocale()
  @ApiOperation({ summary: 'Get the latest terms of service' })
  @ApiStandardResponse({ type: WebGetLatestTermsOfServiceResponse })
  async getLatestTermsOfService(
    @Locale() code: LocaleCode,
  ): ReturnType<TermsOfServiceService['getLatestOne']> {
    return this.tosService.getLatestOne(code);
  }

  @Post('users')
  @ApiOperation({ summary: 'Register as a new user' })
  @ApiStandardResponse({ status: HttpStatus.CREATED })
  async registerUser(@Body() dto: WebRegisterDTO): Promise<void> {
    return this.userService.register(dto);
  }
}
