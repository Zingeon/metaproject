import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class SeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:data',
    describe: 'Seed the database with initial data',
  })
  async seed() {
    try {
      await this.seedService.seed();
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
} 