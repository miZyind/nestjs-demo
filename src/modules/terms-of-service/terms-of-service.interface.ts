import type { TermsOfServiceTranslations } from '#entities/terms-of-service-translation.entity';

export interface GetLatestOneResponse {
  updatedAt: Date;
  version: number;
  content: string;
}

export interface UpsertTermsOfServiceDTO {
  version?: number;
  note: string;
  translations: TermsOfServiceTranslations;
}

export interface UpsertTermsOfServiceResponse {
  version: number;
}
