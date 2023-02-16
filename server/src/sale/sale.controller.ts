import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { SaleDto, SaleInput } from "./dto/sale.dto";
import { SaleService } from "./sale.service";
import { Request } from "express";

@Controller('sales')
export class SaleController {
    constructor(
      private readonly saleService: SaleService
    ) {}
    
    @Get('/:id')
    public async findOneSale(@Param('id') id: string): Promise<SaleDto | null> {
      const result = await this.saleService.findOne({
        where: { id },
        select: {
          createdAt: true,
          id: true,
          products: true,
          customerInfo: true,
          customerId: true,
          totalAmount: true,
          paidAmount: true,
          outstandingAmount: true,
          userId: true,
        }
      })
      if (!result) {
        throw new HttpException(`Resource with id ${id} not found.`, HttpStatus.NOT_FOUND)
      }
      return result;

    }
    @Get('')
    @HttpCode(200)
    public async findAllSales(@Req() request: Request): Promise<SaleDto[]> {
      const result = await this.saleService.findMany({
          select: {
            createdAt: true,
            id: true,
            products: true,
            customerInfo: true,
            customerId: true,
            totalAmount: true,
            paidAmount: true,
            outstandingAmount: true,
            userId: true
          }
      })
      return result
    }

    @Post('')
    public async createSale(@Body() data: SaleInput): Promise<SaleDto> {
      return await this.saleService.create({
        data: {
          customerId: data.customerId,
          paidAmount: data.paidAmount,
          totalAmount: data.totalAmount,
          outstandingAmount: data.outstandingAmount? data.outstandingAmount : data.totalAmount - data.outstandingAmount,
          userId: data.userId,
          products: {
            createMany: {
              data: data.products
            }
          },
        },
        select: {
          createdAt: true,
          id: true,
          products: true,
          customerInfo: true,
          customerId: true,
          totalAmount: true,
          paidAmount: true,
          outstandingAmount: true,
          userId: true,
        },
      })
    }
}