import { MigrationInterface, QueryRunner } from "typeorm";

export class RecommendedIndexes1750189874131 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_category_name" ON "category" ("name");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_item_category" ON "item" ("categoryId");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_category_closure_ancestor" ON "category_closure" ("id_ancestor");
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_item_labels_item" ON "item_labels_label" ("itemId");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_category_name";
            DROP INDEX IF EXISTS "IDX_item_category";
            DROP INDEX IF EXISTS "IDX_category_closure_ancestor";
            DROP INDEX IF EXISTS "IDX_item_labels_item";
        `);
    }

}
