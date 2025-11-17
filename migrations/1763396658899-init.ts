import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1763396658899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 用户表
    await queryRunner.query(`
          CREATE TABLE \`user\`
          (
              \`id\`                BIGINT       NOT NULL AUTO_INCREMENT,
              \`username\`          VARCHAR(255) NOT NULL,
              \`encrypted_password\` VARCHAR(255) NOT NULL,
              \`locked\`            TINYINT(1) DEFAULT 0,
              \`enabled\`           TINYINT(1) DEFAULT 1,

              \`created_time\`      DATETIME DEFAULT CURRENT_TIMESTAMP,
              \`updated_time\`      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

              PRIMARY KEY (\`id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户表';
      `);

    // 角色表
    await queryRunner.query(`
        CREATE TABLE \`role\`
        (
            \`id\`           BIGINT       NOT NULL AUTO_INCREMENT,
            \`code\`         VARCHAR(255) NOT NULL,
            \`label\`        VARCHAR(255) NOT NULL,
            \`created_time\` DATETIME DEFAULT CURRENT_TIMESTAMP,
            \`updated_time\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '角色表';
    `);

    // 用户角色关联表
    queryRunner.query(`
        CREATE TABLE \`user_role\`
        (
            \`user_id\` BIGINT NOT NULL,
            \`role_id\` BIGINT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`role\``);
    await queryRunner.query(`DROP TABLE \`user_role\``);
  }
}
