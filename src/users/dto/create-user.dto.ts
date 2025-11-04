// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, Length, IsOptional, IsBoolean, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'juan123',
  })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @Length(2, 100, { message: 'El nombre de usuario debe tener entre 2 y 100 caracteres' })
  readonly username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'securePassword123',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @Length(6,60, { message: 'La contraseña debe tener entre 6 y 60 caracteres' })
  readonly password: string;

  @ApiProperty({
    example: 1,
    description: 'ID del rol asignado al usuario', })
  @IsInt()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;
}

