import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { MailService } from "./mail.service";
import { ContactDto } from "./dto/contact.dto";
import { plainToInstance } from "class-transformer";

import { validate } from "class-validator";
import { MeetingDto } from "./dto/meeting.dto";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("contact")
  async sendMail(@Body() dto: ContactDto): Promise<{ message: string }> {
    try {
      await this.mailService.sendContactEmail(dto);

      return {
        message:
          "✅ Thank you for reaching out. Your message has been successfully delivered.",
      };
    } catch (error) {
      console.error("❌ Failed to send contact email:", error);
      throw new InternalServerErrorException(
        "Failed to send your message. Please try again later."
      );
    }
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
