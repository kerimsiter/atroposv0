import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async listByCompanyBranch(
    companyTax: string,
    branchCode?: string,
  ): Promise<Array<{ id: string; name: string; avatarUrl?: string; shift?: string }>> {
    const company = await this.prisma.company.findUnique({ where: { taxNumber: companyTax } })
    if (!company) throw new NotFoundException('Company not found')

    let branchId: string | undefined
    if (branchCode) {
      const branch = await this.prisma.branch.findFirst({ where: { companyId: company.id, code: branchCode } })
      if (!branch) throw new NotFoundException('Branch not found')
      branchId = branch.id
    }

    const users = await this.prisma.user.findMany({
      where: {
        companyId: company.id,
        active: true,
        ...(branchId ? { branchId } : {}),
      },
      orderBy: { firstName: 'asc' },
    })

    return users.map((u) => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`.trim(),
      avatarUrl: u.avatar ?? undefined,
      // shift info would come from scheduling tables in advanced setup
      shift: undefined,
    }))
  }
}
