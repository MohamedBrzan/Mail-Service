import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString } from "class-validator";

export class MeetingDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  meetingType!: string;

  @Type(() => Date)
  @IsDate()
  date!: Date;

  @IsString()
  time!: string;

  @IsString()
  information!: string;
}
