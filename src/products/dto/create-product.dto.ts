import { Transform } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength, IsBoolean } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    pricePesos?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    promotionalPricePesos?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    priceDollar?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    promotionalPriceDollar?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    specifications?: string[];

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isAvailable?: boolean;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if ( value === 'true' ) return true;
        if ( value === 'false' ) return false;
        return value;
    })
    isDeleted?: boolean;

    @IsString({ each: true })
    @IsArray()
    categoryIds: string[];

}
