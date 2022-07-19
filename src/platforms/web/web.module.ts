import { Module } from '@nestjs/common';

import { TermsOfServiceModule } from '#modules/terms-of-service/terms-of-service.module';
import { TodoModule } from '#modules/todo/todo.module';
import { UserModule } from '#modules/user/user.module';
import { WebProtectedController } from '#platforms/web/web.protected.controller';
import { WebPublicController } from '#platforms/web/web.public.controller';

@Module({
  imports: [TermsOfServiceModule, TodoModule, UserModule],
  providers: [],
  controllers: [WebProtectedController, WebPublicController],
})
export class WebModule {}
