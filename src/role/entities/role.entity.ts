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

  @ApiProperty({ example: 'Rol de administrador', description: 'Descripción del rol' })
  @Column({ nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
