import { IsString, IsEmail, IsInt, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 1,
  })
  @IsInt({ message: 'El ID debe ser un número entero' })
  readonly id: number;

  @ApiProperty({
    example: "1",
    description: 'ID del rol asignado al usuario',
  })
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  readonly role_id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juanpérez',
  })
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  readonly username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: 'Fecha de creación del usuario',
    example: '2024-01-01T00:00:00Z',
  })
  @IsDateString()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Fecha de actualización del usuario',
    example: '2024-01-02T00:00:00Z',
  })
  @IsDateString()
  readonly updatedAt: Date;
}