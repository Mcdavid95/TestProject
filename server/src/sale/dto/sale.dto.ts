
import { ObjectType, Field, InputType } from "@nestjs/graphql";
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
import { ProductSale } from "../../productSale/dto/productSale.dto";
import { CustomerCreateInput } from "../../customer/base/CustomerCreateInput";
import { Optional } from "@nestjs/common";

@ObjectType()
export class SaleDto {
  @ApiProperty({
    required: true,
  })
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
  userId!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String)
  customerId!: string;

  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  @Field(() => Number)
  @IsOptional()
  paidAmount!: number;

  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  @Field(() => Number)
  totalAmount!: number;

  @ApiProperty({
    required: false,
  })
  @Optional()
  @Type(() => Number)
  @Field(() => Number)
  outstandingAmount!: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
    type: () => [ProductSale],
  })
  @ValidateNested()
  @Type(() => ProductSale)
  @IsOptional()
  products?: Array<ProductSale>;
}

@InputType()
export class SaleInput {
  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  @IsOptional()
  createdAt!: Date;

  @ApiProperty({
    required: false,
  })
  @Type(() => String)
  @Field(() => String)
  @IsOptional()
  customerEmail!: string;

  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  @Field(() => Number)
  @IsOptional()
  paidAmount!: number;

  @ApiProperty({
    required: false,
  })
  @Type(() => Number)
  @Field(() => Number)
  totalAmount!: number;

  @ApiProperty({
    required: false,
  })
  @Optional()
  @Type(() => Number)
  @Field(() => Number)
  outstandingAmount!: number;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  userId!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  customerId!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: () => [ProductSale],
  })
  @ValidateNested()
  @Type(() => ProductSale)
  products!: Array<ProductSale>;
}
