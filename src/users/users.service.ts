// src/users/users.service.ts
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/entities/role.entity';
import { ResponseUserDto } from './dto/response-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  // ==========================
  // Método helper: mapea User a ResponseUserDto
  // ==========================
  private mapToResponseDto(user: User): ResponseUserDto {
    return {
      id: user.id,
      role_id: user.role?.id,
      username: user.username,
      email: user.email,
      is_active: user.is_active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // ==========================
  // Get all users
  // ==========================
  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.usersRepository.find({ relations: ['role'] });
    return users.map(this.mapToResponseDto);
  }

  // ==========================
  // Get a single user by ID
  // ==========================
  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.mapToResponseDto(user);
  }

  // ==========================
  // Create a new user
  // ==========================
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    // Obtener el rol desde la base de datos
    const role = await this.roleRepository.findOne({
      where: { id: createUserDto.role_id },
    });
    if (!role) throw new NotFoundException('Rol no encontrado');

    const user = this.usersRepository.create({
      ...createUserDto,
      role,
    });

    const savedUser = await this.usersRepository.save(user);
    return this.mapToResponseDto(savedUser);
  }

  // ==========================
  // Update an existing user
  // ==========================
  async update(id: number, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // Si viene un roleId, buscar el rol y asignarlo
    if (updateUserDto.role_id) {
      const role = await this.roleRepository.findOne({
        where: { id: updateUserDto.role_id },
      });
      if (!role) throw new NotFoundException('Rol no encontrado');
      user.role = role;
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    return this.mapToResponseDto(updatedUser);
  }

  // ==========================
  // Delete a user
  // ==========================
  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Usuario no encontrado');
  }
}

