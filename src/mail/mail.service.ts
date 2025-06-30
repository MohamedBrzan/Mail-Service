import { Injectable, Logger } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { ContactDto } from "./dto/contact.dto";
import { MeetingDto } from "./dto/meeting.dto";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly recipient: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService
  ) {
    this.recipient = this.config.get<string>("MAIL_RECIPIENT")!;
  }

  async sendContactEmail(dto: ContactDto): Promise<void> {
    await this.sendMail({
      to: this.recipient,
      subject: `New Contact Form Submission: ${dto.subject}`,
      template: "contact-message",
      context: { ...dto },
    });
  }

  async sendMeetingEmail(dto: MeetingDto): Promise<void> {
    const context = this.buildMeetingContext(dto);

    const confirmation = this.sendMail({
      to: dto.email,
      subject: `📅 Your Meeting Request: ${dto.meetingType}`,
      template: "meeting-confirmation",
      context,
    });

    const adminNotification = this.sendMail({
      to: this.recipient,
      subject: `📥 New Meeting Request from ${dto.name}`,
      template: "meeting-request",
      context,
    });

    await Promise.all([confirmation, adminNotification]);
  }

  async sendMeetingRequest(dto: MeetingDto): Promise<void> {
    const context = this.buildMeetingContext(dto);
    await this.sendMail({
      to: this.recipient,
      subject: `📅 New Meeting Request from ${dto.name}`,
      template: "meeting-confirmation",
      context,
    });
  }

  private async sendMail({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
  }): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
    } catch (error: any) {
      this.logger.error(`Failed to send mail [${subject}]`, error.stack);
      throw error;
    }
  }

  private buildMeetingContext(meeting: MeetingDto): Record<string, any> {
    return {
      name: meeting.name,
      email: meeting.email,
      phone: meeting.phone,
      meetingType: meeting.meetingType,
      date: meeting.date.toLocaleDateString(),
      time: meeting.time,
      information: meeting.information,
    };
  }
}
