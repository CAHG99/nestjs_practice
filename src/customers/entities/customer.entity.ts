import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany,} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'customers' })
export class Customer {
  @ApiProperty({ example: 1, description: 'Identificador único del cliente' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Carlos Pérez', description: 'Nombre completo del cliente' })
  @Column()
  fullname: string;

  @ApiProperty({ example: 'carlos@example.com', description: 'Correo electrónico único' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '123456789', description: 'Número de teléfono del cliente' })
  @Column({ nullable: true })
  phone: string;
 
  @OneToOne(() => User, (user) => user.customer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
