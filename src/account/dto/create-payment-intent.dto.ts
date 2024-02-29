import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
