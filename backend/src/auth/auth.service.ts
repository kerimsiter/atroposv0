import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import * as crypto from 'crypto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

const BCRYPT_ROUNDS = 10
async function hashPin(pin: string): Promise<string> {
  return await bcrypt.hash(pin, BCRYPT_ROUNDS)
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async verifyPin(params: {
    companyTax: string
    branchCode?: string
    userId: string
    pin: string
  }): Promise<{ ok: true; userId: string; sessionToken: string }> {
    const company = await this.prisma.company.findUnique({ where: { taxNumber: params.companyTax } })
    if (!company) throw new UnauthorizedException('Invalid company')

    let branchId: string | undefined
    if (params.branchCode) {
      const branch = await this.prisma.branch.findFirst({ where: { companyId: company.id, code: params.branchCode } })
      if (!branch) throw new UnauthorizedException('Invalid branch')
      branchId = branch.id
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: params.userId,
        companyId: company.id,
        ...(branchId ? { branchId } : {}),
        active: true,
      },
    })
    if (!user || !user.pin) throw new UnauthorizedException('Invalid credentials')

    const isValid = await bcrypt.compare(params.pin, user.pin)
    if (!isValid) throw new UnauthorizedException('Invalid credentials')

    // Issue JWT (access token) and create session for audit if needed
    const accessToken = await this.jwt.signAsync({ sub: user.id, companyId: user.companyId, branchId })
    await this.prisma.session.create({ data: { userId: user.id, branchId, token: accessToken } })
    return { ok: true, userId: user.id, sessionToken: accessToken }
  }
}
