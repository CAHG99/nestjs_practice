import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({ example: 1, description: 'Identificador único del rol' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Nombre del rol' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: true, description: 'Indica si el rol está activo' })
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
