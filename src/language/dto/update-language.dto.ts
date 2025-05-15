import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateLanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()

  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  icon: string;
}
