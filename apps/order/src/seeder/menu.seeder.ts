// src/seeder/menu.seeder.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '../../../../libs/common/src/entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {}

  async onApplicationBootstrap() {
    const exists = await this.menuRepo.count();
    if (exists > 0) return;

    await this.menuRepo.save([
      { name: 'Nasi Goreng', price: 20000 },
      { name: 'Ayam Bakar', price: 25000 },
      { name: 'Es Teh', price: 5000 },
    ]);

    console.log('✅ Menu data seeded.');
  }
}
