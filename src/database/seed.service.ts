// src/database/seed.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { AppDataSource } from '../config/typeorm.config';
import { populateFromCSV } from './utils/populate-from-csv';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { Role } from '../role/entities/role.entity';
import { Category } from '../categories/entities/category.entity';

interface SeedItem {
  entity: any;
  file: string;
}

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  private readonly seedData: SeedItem[] = [
    { entity: User, file: './src/database/data/users.csv' },
    { entity: Role, file: './src/database/data/roles.csv' },
    { entity: Customer, file: './src/database/data/customers.csv' },
    { entity: Category, file: './src/database/data/categories.csv' },
    { entity: Product, file: './src/database/data/products.csv' },
    { entity: Order, file: './src/database/data/orders.csv' },
  ];

  async run() {
    try {
      const dataSource = await AppDataSource.initialize();
      this.logger.log('✅ Conexión a la DB exitosa');

      // ⚙️ Limpiar tablas (opcional, solo para dev)
      await dataSource.synchronize(true);

      for (const { entity, file } of this.seedData) {
        const repository = dataSource.getRepository(entity);
        await populateFromCSV(repository, file);
      }

      await dataSource.destroy();
      this.logger.log('🌱 Todos los seeders ejecutados correctamente');
    } catch (error) {
      this.logger.error('❌ Error ejecutando seeders', error);
      process.exit(1);
    }
  }
}
