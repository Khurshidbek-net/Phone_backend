import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  phoneId: number;
}
