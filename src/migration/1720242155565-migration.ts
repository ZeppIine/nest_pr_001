import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720242155565 implements MigrationInterface {
    name = 'Migration1720242155565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lecture\` DROP FOREIGN KEY \`FK_82ee5ed5ed3b21099e40c71382d\``);
        await queryRunner.query(`ALTER TABLE \`lecture\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`school\` DROP FOREIGN KEY \`FK_b75c78082d7ea9dff30f9aba409\``);
        await queryRunner.query(`ALTER TABLE \`school\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lecture\` ADD CONSTRAINT \`FK_82ee5ed5ed3b21099e40c71382d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`school\` ADD CONSTRAINT \`FK_b75c78082d7ea9dff30f9aba409\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`school\` DROP FOREIGN KEY \`FK_b75c78082d7ea9dff30f9aba409\``);
        await queryRunner.query(`ALTER TABLE \`lecture\` DROP FOREIGN KEY \`FK_82ee5ed5ed3b21099e40c71382d\``);
        await queryRunner.query(`ALTER TABLE \`school\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`school\` ADD CONSTRAINT \`FK_b75c78082d7ea9dff30f9aba409\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lecture\` CHANGE \`user_id\` \`user_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lecture\` ADD CONSTRAINT \`FK_82ee5ed5ed3b21099e40c71382d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
    }

}
