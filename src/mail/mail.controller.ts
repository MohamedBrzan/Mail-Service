import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { MailService } from "./mail.service";
import { ContactDto } from "./dto/contact.dto";
import { plainToInstance } from "class-transformer";

import { validate } from "class-validator";
import { MeetingDto } from "./dto/meeting.dto";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("contact")
  async sendMail(@Body() dto: ContactDto) {
    return this.mailService.sendContactEmail(dto);
  }

  @Post("meeting")
  async handleMeetingRequest(@Body() body: any) {
    const meetingDto = plainToInstance(MeetingDto, body);
    const errors = await validate(meetingDto);

    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map((e) => Object.values(e.constraints || {})).flat()
      );
    }

    await this.mailService.sendMeetingEmail(meetingDto);

    return {
      message: "Meeting request received and confirmation email sent.",
    };
  }
}
