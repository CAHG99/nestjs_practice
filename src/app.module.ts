// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { CategoryModule } from './categories/category.module';
import { RoleModule } from './role/role.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Order } from './orders/entities/order.entity';
import { Customer } from './customers/entities/customer.entity';
import { Category } from './categories/entities/category.entity';
import { Role } from './role/entities/role.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
let envFilePath = '.env.development';
if (process.env.ENVIRONMENT === 'PRODUCTION') {
  envFilePath = '.env.production';
} else if (process.env.ENVIRONMENT === 'TEST') {
  envFilePath = '.env.testing';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ⚡ hace que esté disponible en todo el proyecto
      envFilePath,
    }),    
    TypeOrmModule.forRoot({
      type: 'postgres',          // Cambia por tu base (mysql, sqlite, etc.)
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, Customer, Category, Role],
      synchronize: true,         // Solo para dev: crea tablas automáticamente
      autoLoadEntities: true,   // Carga entidades automáticamente
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    CategoryModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
