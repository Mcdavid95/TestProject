import { HttpStatus, INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import request from "supertest";
import { SaleDto, SaleInput } from "./dto/sale.dto";
import { SaleController } from "./sale.controller";
import { SaleService } from "./sale.service";

const CREATE_INPUT: SaleInput = {
  createdAt: new Date(),
  userId: "exampleUserId",
  customerId: "exampleCustomerId",
  customerEmail: "customer@email.com",
  paidAmount: 1000,
  totalAmount: 1000,
  outstandingAmount: 0,
  products: [{
    createdAt: new Date(),
    saleId: "exampleSaleId",
    id: "exampleProductSaleId",
    itemPrice: 500,
    quantity: 2,
    productId: "exampleProductId"
  }],
  id: "exampleSaleId"
}
const nonExistingId = "nonExistingId";
const existingId = "existingId";

const CREATE_RESULT = {
  createdAt: new Date(),
  id: "exampleSaleId",
  products: [{
    createdAt: new Date().toISOString(),
    saleId: "exampleSaleId",
    id: "exampleProductSaleId",
    itemPrice: 500,
    quantity: 2,
    productId: "exampleProductId"
  }],
  customerId: "exampleCustomerId",
  totalAmount: 1000,
  paidAmount: 1000,
  outstandingAmount: 0,
  userId: "exampleUserId"
}

const saleService = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => [CREATE_RESULT],
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return CREATE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

describe("Sale", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [{
        provide: SaleService,
        useValue: saleService
      }],
      controllers: [SaleController]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  test("POST /sales", async () => {
    await request(app.getHttpServer())
      .post("/sales")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
      });
  });

  test("GET /sales",async () => {
    await request(app.getHttpServer())
      .get("/sales/")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...CREATE_RESULT,
          createdAt: CREATE_RESULT.createdAt.toISOString(),
        }
      ]);
  });

  test("GET /sales/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`/sales/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Resource with id ${nonExistingId} not found.`
      });
  })

  test("GET /sales/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/sales"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
      });
  });
})