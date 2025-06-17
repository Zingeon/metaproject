import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialDbStructure1750151101808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "parentId",
                        type: "uuid",
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "category_closure",
                columns: [
                    {
                        name: "id_ancestor",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_descendant",
                        type: "uuid",
                        isPrimary: true
                    }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "label",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "item",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "name",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "description",
                        type: "jsonb",
                        isNullable: true
                    },
                    {
                        name: "images",
                        type: "text",
                        isArray: true,
                        isNullable: false
                    },
                    {
                        name: "categoryId",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createTable(
            new Table({
                name: "item_labels_label",
                columns: [
                    {
                        name: "itemId",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "labelId",
                        type: "uuid",
                        isPrimary: true
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "category",
            new TableForeignKey({
                columnNames: ["parentId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION"
            })
        );

        await queryRunner.createForeignKey(
            "category_closure",
            new TableForeignKey({
                columnNames: ["id_ancestor"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "CASCADE",
                onUpdate: "NO ACTION"
            })
        );

        await queryRunner.createForeignKey(
            "category_closure",
            new TableForeignKey({
                columnNames: ["id_descendant"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "CASCADE",
                onUpdate: "NO ACTION"
            })
        );

        await queryRunner.createForeignKey(
            "item",
            new TableForeignKey({
                columnNames: ["categoryId"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "NO ACTION",
                onUpdate: "NO ACTION"
            })
        );

        await queryRunner.createForeignKey(
            "item_labels_label",
            new TableForeignKey({
                columnNames: ["itemId"],
                referencedColumnNames: ["id"],
                referencedTableName: "item",
                onDelete: "CASCADE",
                onUpdate: "NO ACTION"
            })
        );

        await queryRunner.createForeignKey(
            "item_labels_label",
            new TableForeignKey({
                columnNames: ["labelId"],
                referencedColumnNames: ["id"],
                referencedTableName: "label",
                onDelete: "CASCADE",
                onUpdate: "NO ACTION"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const itemLabelsLabelTable = await queryRunner.getTable("item_labels_label");
        const itemTable = await queryRunner.getTable("item");
        const categoryClosureTable = await queryRunner.getTable("category_closure");
        const categoryTable = await queryRunner.getTable("category");

        if (itemLabelsLabelTable) {
            const foreignKeys = itemLabelsLabelTable.foreignKeys;
            await Promise.all(
                foreignKeys.map(foreignKey => queryRunner.dropForeignKey("item_labels_label", foreignKey))
            );
        }

        if (itemTable) {
            const foreignKeys = itemTable.foreignKeys;
            await Promise.all(
                foreignKeys.map(foreignKey => queryRunner.dropForeignKey("item", foreignKey))
            );
        }

        if (categoryClosureTable) {
            const foreignKeys = categoryClosureTable.foreignKeys;
            await Promise.all(
                foreignKeys.map(foreignKey => queryRunner.dropForeignKey("category_closure", foreignKey))
            );
        }

        if (categoryTable) {
            const foreignKeys = categoryTable.foreignKeys;
            await Promise.all(
                foreignKeys.map(foreignKey => queryRunner.dropForeignKey("category", foreignKey))
            );
        }

        await queryRunner.dropTable("item_labels_label");
        await queryRunner.dropTable("item");
        await queryRunner.dropTable("label");
        await queryRunner.dropTable("category_closure");
        await queryRunner.dropTable("category");
    }

}
