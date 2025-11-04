import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({
    example: 1,
    description: 'Identificador único de la categoría',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Electrónica',
    description: 'Nombre de la categoría',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example: 'Categoría de productos electrónicos',
    description: 'Descripción de la categoría',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: true, description: 'Indica si la categoría está activa' })
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
