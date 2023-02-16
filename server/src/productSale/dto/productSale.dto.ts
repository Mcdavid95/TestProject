
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { Order } from "../../order/base/Order";

@ObjectType()
class ProductSale {
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  @IsOptional()
  saleId!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  productId!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNumber()
  @Field(() => Number)
  itemPrice!: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsNumber()
  @Field(() => Number)
  quantity!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String)
  id!: string;
}

export { ProductSale };
