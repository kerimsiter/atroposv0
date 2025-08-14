import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsOptional, IsString, Length } from 'class-validator'

class VerifyPinDto {
  @IsString()
  companyTax!: string

  @IsOptional()
  @IsString()
  branchCode?: string

  @IsString()
  userId!: string

  @IsString()
  @Length(4, 8)
  pin!: string
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('pin-verify')
  async verifyPin(@Body() body: VerifyPinDto): Promise<{ ok: true; userId: string; sessionToken: string }> {
    return this.auth.verifyPin(body)
  }
}
