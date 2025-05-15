import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePhoneDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    ram: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    rom: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    box_with_document: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_new: boolean;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    posted_date: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    views: bigint;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    like_counts: bigint;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_negotiable: boolean;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    brand: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    model: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_checked: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_archived: boolean;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_deleted: boolean;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    currencyId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    modelId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    brandId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    colorId: number;

    // @ApiProperty()
    // @IsNumber()
    // @IsOptional()
    // addressId: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    userId: number;
}
