import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('pin-verify')
  async verifyPin(
    @Body()
    body: { companyTax?: string; branchCode?: string; userId?: string; pin?: string },
  ): Promise<{ ok: true; userId: string; sessionToken: string }> {
    const { companyTax, branchCode, userId, pin } = body ?? {}
    if (!companyTax || !userId || !pin) {
      throw new BadRequestException('companyTax, userId ve pin zorunludur')
    }
    if (typeof companyTax !== 'string' || typeof userId !== 'string' || typeof pin !== 'string') {
      throw new BadRequestException('Geçersiz parametre tipleri')
    }
    return this.auth.verifyPin({ companyTax, branchCode, userId, pin })
  }
}
