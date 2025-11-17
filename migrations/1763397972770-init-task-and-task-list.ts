import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTaskAndTaskList1763397972770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 任务表
    await queryRunner.query(`
          CREATE TABLE \`task\`
          (
              \`id\`           BIGINT       NOT NULL AUTO_INCREMENT,

              \`name\`         VARCHAR(255) NOT NULL,

              -- enum → varchar
              \`status\`       VARCHAR(255) NOT NULL DEFAULT 'TO_DO',

              -- ManyToOne → 普通字段
              \`task_list_id\` BIGINT NULL,

              -- TraceableEntity (snake_case)
              \`create_by_id\` BIGINT NULL,
              \`update_by_id\` BIGINT NULL,

              -- BaseEntity
              \`created_time\` DATETIME              DEFAULT CURRENT_TIMESTAMP,
              \`updated_time\` DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

              PRIMARY KEY (\`id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '任务表';
      `);

    // 任务列表表
    await queryRunner.query(`
        CREATE TABLE \`task_list\`
        (
            \`id\`           BIGINT       NOT NULL AUTO_INCREMENT,

            \`name\`         VARCHAR(255) NOT NULL,

            -- enum → varchar
            \`status\`       VARCHAR(255) NOT NULL DEFAULT 'ACTIVE',

            -- TraceableEntity (snake_case)
            \`create_by_id\` BIGINT NULL,
            \`update_by_id\` BIGINT NULL,

            -- BaseEntity
            \`created_time\` DATETIME              DEFAULT CURRENT_TIMESTAMP,
            \`updated_time\` DATETIME              DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '任务列表表';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`task\``);
    await queryRunner.query(`DROP TABLE \`task_list\``);
  }
}
