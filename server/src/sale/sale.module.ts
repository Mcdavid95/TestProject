import { Module } from "@nestjs/common";
import { SaleServiceBase } from "./base/sale.service.base";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

@Module({
  imports:  [],
  controllers: [SaleController],
  providers:  [SaleService, SaleServiceBase]
})

export class SaleModule {}