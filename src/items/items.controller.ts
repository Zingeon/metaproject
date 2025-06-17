import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ItemsService } from './items.service';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { RANDOM_ITEMS_COUNT } from './items.const';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItemsPage(@Res() res: Response) {
    const items = await this.itemsService.getRandomItems(RANDOM_ITEMS_COUNT);
    const templatePath = path.join(__dirname, './views/items.html');
    const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));

    const html = template({ items });
    res.send(html);
  }

  @Get(':id/similar')
  async getSimilarItemsPage(@Param('id') id: string, @Res() res: Response) {
    try {
      const items = await this.itemsService.getSimilarItems(id);
      const templatePath = path.join(__dirname, './views/similar-items.html');
      const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
      const html = template({ items });
      res.send(html);
    } catch (error) {
      res.status(404).send('Item not found');
    }
  }
}
