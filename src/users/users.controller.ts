// src/users/users.controller.ts
import { Controller, Get, Post, Body, Patch, Delete, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.', type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado.', type: User })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente..', type: User })
  update(
    @Param('id') id: number,
    @Body() updateUserDto: Partial<UpdateUserDto>): Promise<User> {
    return this.usersService.update(id, updateUserDto);
}
  @Delete("id")
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}