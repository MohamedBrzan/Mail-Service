import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { ContactDto } from "./dto/contact.dto";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService
  ) {}

  async sendMail(dto: ContactDto) {
    const { name, email, message } = dto;

    const mailOptions = {
      from: `"${name}" <${this.config.get("MAIL_USER")}>`, // Must match authenticated user
      to: "mohamedbrzan.dev@gmail.com",
      replyTo: email, // ✅ This allows you to reply directly to the sender
      subject: `📩 New Contact from ${name}`,
      text: `
    You have a new message from ${name} <${email}>:

    ${message}
  `,
      html: `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Message:</strong><br>${message}</p>
  `,
    };

    await this.mailerService.sendMail(mailOptions);

    return { status: "ok", message: "Message sent" };
  }
}
