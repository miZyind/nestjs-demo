import type { SystemLogType } from '#entities/system-log.entity';

export interface CreateSystemLogDTO {
  type: SystemLogType;
  note: string;
  data: Record<string, unknown>;
}
