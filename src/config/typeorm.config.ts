import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Category } from '../categories/entities/category.entity';
import { Role } from '../role/entities/role.entity';
import * as dotenv from 'dotenv';

// Cargar el archivo .env correcto antes de definir las opciones
dotenv.config({
  path:
    process.env.ENVIRONMENT === 'PRODUCTION'
      ? '.env.production'
      : process.env.ENVIRONMENT === 'TEST'
      ? '.env.testing'
      : '.env.development',
});

// ✅ Configuración de TypeORM (la podemos reutilizar)
export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Product, Order, Customer, Category, Role],
  synchronize: true, // Solo para desarrollo
  logging: false,
};

// ✅ DataSource independiente (para scripts CLI o seeders)
export const AppDataSource = new DataSource(typeOrmConfig);
