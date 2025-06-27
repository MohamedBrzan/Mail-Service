import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          port: config.get("MAIL_PORT"),
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASS"),
          },
        },
      }),
      inject: [ConfigService],
    }),
    MailModule,
  ],
})
export class AppModule {}
