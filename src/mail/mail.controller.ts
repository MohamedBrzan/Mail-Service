import { Controller, Post, Body } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ContactDto } from "./dto/contact.dto";
import {  } from "@nestjs/throttler";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("contact")
  async sendMail(@Body() dto: ContactDto) {
    return this.mailService.sendMail(dto);
  }
}
