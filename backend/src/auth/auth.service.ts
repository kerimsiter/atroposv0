import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import * as crypto from 'crypto'

function hashPin(pin: string): string {
  return crypto.createHash('sha256').update(pin, 'utf8').digest('hex')
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

    const hashed = hashPin(params.pin)
    if (user.pin !== hashed) throw new UnauthorizedException('Invalid credentials')

    // Minimal session token for now
    const token = crypto.randomBytes(24).toString('hex')
    await this.prisma.session.create({
      data: {
        userId: user.id,
        branchId,
        token,
      },
    })
    return { ok: true, userId: user.id, sessionToken: token }
  }
}
