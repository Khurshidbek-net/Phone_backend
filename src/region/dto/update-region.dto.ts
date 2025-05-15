import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
