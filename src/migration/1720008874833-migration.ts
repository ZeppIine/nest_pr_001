import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720008874833 implements MigrationInterface {
    name = 'Migration1720008874833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`lecture\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`time\` int NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`school\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_b75c78082d7ea9dff30f9aba40\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(16) NOT NULL, \`birth\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lecture\` ADD CONSTRAINT \`FK_82ee5ed5ed3b21099e40c71382d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`school\` ADD CONSTRAINT \`FK_b75c78082d7ea9dff30f9aba409\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`school\` DROP FOREIGN KEY \`FK_b75c78082d7ea9dff30f9aba409\``);
        await queryRunner.query(`ALTER TABLE \`lecture\` DROP FOREIGN KEY \`FK_82ee5ed5ed3b21099e40c71382d\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_b75c78082d7ea9dff30f9aba40\` ON \`school\``);
        await queryRunner.query(`DROP TABLE \`school\``);
        await queryRunner.query(`DROP TABLE \`lecture\``);
    }

}
