import { IsString, IsEmail, Length, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juanpérez',
  })
  @IsOptional()
  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @Length(2, 100)
  readonly username?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email?: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'newSecurePassword123',
  })
  @IsOptional()
  @IsString()
  @Length(6,60, { message: 'La contraseña debe tener entre 6 y 60 caracteres' })
  readonly password?: string;

  @ApiProperty({
    example: "2",
    description: 'ID del rol asignado al usuario',
  })
  @IsOptional()
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  readonly role_id?: number;

  @ApiProperty({
    description: 'Indica si el usuario está activo',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;
}