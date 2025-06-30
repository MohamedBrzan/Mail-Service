import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") ?? "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown props
      forbidNonWhitelisted: true, // throw if unknown props exist
      transform: true, // auto-transform DTOs
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Prefix for API versioning
  app.setGlobalPrefix("api/v1");

  // Start app
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen(port, host);

  const isProd = process.env.NODE_ENV === "production";
  const baseUrl = process.env.APP_BASE_URL ?? `http://localhost:${port}`;

  console.log(
    `🚀 Application is running on: ${baseUrl} as ${
      isProd ? "Production" : "Development"
    }`
  );
  console.log(`📧 Mail endpoint: ${baseUrl}/api/v1/mail/contact`);
  console.log(`📅 Meeting endpoint: ${baseUrl}/api/v1/mail/meeting`);
  console.log(`🏥 Health check: ${baseUrl}/api/v1/health`);
}

bootstrap().catch((error) => {
  console.error("❌ Failed to start application:", error);
  process.exit(1);
});
