import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Item } from '../../items/entities/items.entity';

@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @TreeChildren()
  subcategories: Category[];

  @TreeParent()
  parent: Category;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Item, item => item.category)
  items: Item[];
}
