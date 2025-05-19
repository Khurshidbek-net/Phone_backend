import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNotEmpty()
  is_read: boolean;

  @ApiProperty()
  @IsNotEmpty()
  sent_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  chatId: number;
}
