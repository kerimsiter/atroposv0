import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /api/users?companyTax=...&branchCode=...
  @Get()
  async list(
    @Query('companyTax') companyTax?: string,
    @Query('branchCode') branchCode?: string,
  ): Promise<Array<{ id: string; name: string; avatarUrl?: string; shift?: string }>> {
    if (!companyTax) {
      throw new BadRequestException('companyTax zorunludur')
    }
    if (typeof companyTax !== 'string') {
      throw new BadRequestException('companyTax geçersiz')
    }
    return await this.usersService.listByCompanyBranch(companyTax, branchCode)
  }
}
