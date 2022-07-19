import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TermsOfServiceTranslation } from '#entities/terms-of-service-translation.entity';
import { TermsOfService } from '#entities/terms-of-service.entity';
import { TermsOfServiceService } from '#modules/terms-of-service/terms-of-service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TermsOfService, TermsOfServiceTranslation]),
  ],
  providers: [TermsOfServiceService],
  exports: [TermsOfServiceService],
})
export class TermsOfServiceModule {}
