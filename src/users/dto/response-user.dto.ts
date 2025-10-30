import { IsString, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 1,
  })
  @IsInt({ message: 'El ID debe ser un número entero' })
  readonly id: number;

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
  })
  @IsString({ message: 'El nombre debe ser texto' })
  readonly name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;
}