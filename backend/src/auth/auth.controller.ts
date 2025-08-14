import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('pin-verify')
  async verifyPin(
    @Body()
    body: { companyTax: string; branchCode?: string; userId: string; pin: string },
  ): Promise<{ ok: true; userId: string; sessionToken: string }> {
    return this.auth.verifyPin(body)
  }
}
