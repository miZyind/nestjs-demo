import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1605089310063 implements MigrationInterface {
  name = 'Init1605089310063';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `todo` (`createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(36) NOT NULL, `message` text NOT NULL, `status` enum ('DOING', 'DONE') NOT NULL DEFAULT 'DOING', `accountUUID` varchar(36) NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      "CREATE TABLE `account` (`createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `uuid` varchar(36) NOT NULL, `status` enum ('APPROVE_PENDING', 'APPROVED', 'BANNED') NOT NULL DEFAULT 'APPROVE_PENDING', `role` enum ('User', 'Admin') NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, UNIQUE INDEX `IDX_4c8f96ccf523e9a3faefd5bdd4` (`email`), PRIMARY KEY (`uuid`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'ALTER TABLE `todo` ADD CONSTRAINT `FK_7a6d67832cccac79412cd30f3e4` FOREIGN KEY (`accountUUID`) REFERENCES `account`(`uuid`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `todo` DROP FOREIGN KEY `FK_7a6d67832cccac79412cd30f3e4`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_4c8f96ccf523e9a3faefd5bdd4` ON `account`',
    );
    await queryRunner.query('DROP TABLE `account`');
    await queryRunner.query('DROP TABLE `todo`');
  }
}
