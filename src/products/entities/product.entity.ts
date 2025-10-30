import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({ example: 1, description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Smartphone', description: 'Nombre del producto' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Descripción del producto', description: 'Descripción del producto' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 999.99, description: 'Precio del producto' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ example: 100, description: 'Cantidad en stock del producto' })
  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
