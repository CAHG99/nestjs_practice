import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn,} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orders' })
export class Order {
  @ApiProperty({ example: 1, description: 'Identificador único de la orden' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2023-03-15T12:00:00Z', description: 'Fecha de creación de la orden' })
  @CreateDateColumn()
  orderDate: Date;

  @ApiProperty({ example: 99.99, description: 'Total de la orden' })
  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @ApiProperty({ example: true, description: 'Indica si la orden está activa' })
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
}
