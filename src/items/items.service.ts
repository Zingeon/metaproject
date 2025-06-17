import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/items.entity';
import { SIMILAR_ITEMS_COUNT } from './items.const';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getRandomItems(count: number): Promise<Item[]> {
    const items = await this.itemRepository
      .createQueryBuilder('item')
      .orderBy('RANDOM()')
      .take(count)
      .getMany();

    return items.map(item => ({
      ...item,
      displayName: item.name?.ar || item.name?.en || "",
    }));
  }

  async getSimilarItems(itemId: string): Promise<Item[]> {
    const targetItem = await this.itemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('category.parent', 'parent')
      .where('item.id = :itemId', { itemId })
      .getOne();

    if (!targetItem) {
      throw new Error('Item not found');
    }

    const sameSubcategoryItems = await this.itemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('category.id = :categoryId', { categoryId: targetItem.category.id })
      .andWhere('item.id != :itemId', { itemId })
      .take(SIMILAR_ITEMS_COUNT)
      .getMany();

    if (sameSubcategoryItems?.length < SIMILAR_ITEMS_COUNT && targetItem?.category?.parent) {
      const remainingCount = SIMILAR_ITEMS_COUNT - sameSubcategoryItems.length;
      const siblingSubcategoryItems = await this.itemRepository
        .createQueryBuilder('item')
        .leftJoinAndSelect('item.category', 'category')
        .leftJoinAndSelect('category.parent', 'parent')
        .where('parent.id = :parentCategoryId', { parentCategoryId: targetItem.category.parent.id })
        .andWhere('category.id != :categoryId', { categoryId: targetItem.category.id })
        .andWhere('item.id != :itemId', { itemId })
        .take(remainingCount)
        .getMany();

      return [...sameSubcategoryItems, ...siblingSubcategoryItems].map(item => ({
        ...item,
        displayName: item.name.ar || item.name.en,
      }));
    }

    return sameSubcategoryItems.map(item => ({
      ...item,
      displayName: item.name.ar || item.name.en,
    }));
  }
} 