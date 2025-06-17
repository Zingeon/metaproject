import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { Label } from '../../labels/entities/labels.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: true })
  name: {
    en?: string;
    fr?: string;
    ar?: string;
    uk?: string;
  };

  @Column('jsonb', { nullable: true })
  description: {
    en?: string;
    fr?: string;
    ar?: string;
    uk?: string;
  };

  @Column('jsonb')
  images: string[];

  @ManyToMany(() => Label, label => label.items)
  @JoinTable()
  labels: Label[];

  @ManyToOne(() => Category, category => category.items)
  category: Category;

  @Column({ nullable: true })
  categoryId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Item, item => item.category)
  items: Item[];
} 