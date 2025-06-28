import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("health")
  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    };
  }

  @Get()
  getHello() {
    return {
      message: "NestJS Mail Server API",
      version: "1.0.0",
      endpoints: {
        health: "/health",
        contact: "/mail/contact",
      },
    };
  }
}
