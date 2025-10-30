// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  readonly name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  readonly name?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email?: string;
}

export class ResponseUserDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 1,
  })
  readonly id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  readonly email: string;
}
