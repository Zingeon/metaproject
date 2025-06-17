import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { LabelsModule } from './labels/labels.module';
import { CategoriesModule } from './categories/categories.module';
import { SeedModule } from './seed/seed.module';
import { typeormConfigOptionsData } from "./config/typeorm.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfigOptionsData),
    ItemsModule,
    LabelsModule,
    CategoriesModule,
    SeedModule,
  ],
})
export class AppModule {}
