import { IsEmail } from "class-validator";

export class CreateOrderDto {
  @IsEmail()
  customerEmail: string;

  items: number[];
}
