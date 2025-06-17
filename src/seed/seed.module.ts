import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';
import { Category } from '../categories/entities/categories.entity';
import { Label } from '../labels/entities/labels.entity';
import { Item } from '../items/entities/items.entity';
import { typeormConfigOptionsData } from '../config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfigOptionsData),
    TypeOrmModule.forFeature([Category, Label, Item]),
    CommandModule
  ],
  providers: [SeedService, SeedCommand],
  exports: [SeedService]
})
export class SeedModule {}
