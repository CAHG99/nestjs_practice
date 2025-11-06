import { AppDataSource } from '../config/typeorm.config';
import { populateFromCSV } from './utils/populate-from-csv';
import { User } from '../users/entities/user.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { Role } from '../role/entities/role.entity';
import { Category } from 'src/categories/entities/category.entity';

interface SeedItem {
  entity: any;
  file: string;
}

const seedData: SeedItem[] = [
  { entity: User, file: './src/database/data/users.csv' },
  { entity: Customer, file: './src/database/data/customers.csv' },
  { entity: Product, file: './src/database/data/products.csv' },
  { entity: Order, file: './src/database/data/orders.csv' },
  { entity: Role, file: './src/database/data/roles.csv' },
  { entity: Category, file: './src/database/data/categories.csv' },
];

async function runSeeders() {
  try {
    const dataSource = await AppDataSource.initialize();

    // ⚙️ Si quieres limpiar las tablas primero:
    await dataSource.synchronize(true); // similar a `sequelize.sync({ force: true })`

    for (const { entity, file } of seedData) {
      const repository = dataSource.getRepository(entity);
      await populateFromCSV(repository, file);
    }

    await dataSource.destroy();
    console.log('🌱 Todos los seeders ejecutados correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
    process.exit(1);
  }
}

runSeeders();
