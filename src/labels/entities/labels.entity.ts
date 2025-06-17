import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Item } from '../../items/entities/items.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Item, item => item.labels)
  items: Item[];
} 