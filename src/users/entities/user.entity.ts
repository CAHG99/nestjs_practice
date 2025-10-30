// src/users/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn,} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Customer } from '../../customers/entities/customer.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: 1, description: 'Identificador único del usuario' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'carlos123', description: 'Nombre de usuario único' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'carlos@example.com', description: 'Correo electrónico único' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'Contraseña del usuario' })
  @Column()
  password: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Fecha de creación del usuario' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Customer, (customer) => customer.user)
  customer: Customer;
}
