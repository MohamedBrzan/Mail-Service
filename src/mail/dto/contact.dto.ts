import { IsString } from "class-validator";

export class ContactDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  message!: string;
}
