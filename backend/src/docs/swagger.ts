import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Express com Swagger",
      version: "1.0.0",
      description: "Documentação automática gerada com Swagger",
    },
  },
  apis: ["./src/docs/*.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger disponível em http://localhost:3001/api-docs");
}
