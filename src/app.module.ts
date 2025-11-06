// src/app.module.ts
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig} from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { CategoryModule } from './categories/category.module';
import { RoleModule } from './role/role.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeedModule } from './database/seed.module';
import { SeedService } from './database/seed.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ⚡ hace que esté disponible en todo el proyecto
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    CategoryModule,
    RoleModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  async onApplicationBootstrap() {
    if (process.env.ENVIRONMENT !== 'PRODUCTION') {
      await this.seedService.run();
    }
  }
}