import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Ram, Rom } from "../../../generated/prisma";

// enum Ram {
//     'GB_4',
//     'GB_6',
//     'GB_8',
//     'GB_12',
//     'GB_16',
//     'GB_24',
//     'GB_32',
//     'GB_64',
//     'GB_128'
// }

// enum Rom {
//     'GB_4',
//     'GB_6',
//     'GB_8',
//     'GB_12',
//     'GB_16',
//     'GB_24',
//     'GB_32',
//     'GB_64',
//     'GB_128'
// }

export class CreatePhoneDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsEnum(Ram, {each: true})
    @IsNotEmpty()
    ram: Ram[];

    @ApiProperty()
    @IsEnum(Rom, {each: true})
    @IsNotEmpty()
    rom: Rom[];


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
    @IsInt()
    @IsOptional()
    currencyId?: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    modelId?: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    brandId?: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    colorId?: number;

    // @ApiProperty()
    // @IsInt()
    // @IsOptional()
    // addressId: number;

    @ApiProperty()
    @IsInt()
    @IsOptional()
    userId?: number;
}
