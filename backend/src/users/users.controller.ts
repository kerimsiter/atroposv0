import { Controller, Get, Query } from '@nestjs/common'
import { IsOptional, IsString } from 'class-validator'
import { UsersService } from './users.service'

class ListUsersQueryDto {
  @IsString()
  companyTax!: string

  @IsOptional()
  @IsString()
  branchCode?: string
}

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /api/users?companyTax=...&branchCode=...
  @Get()
  async list(@Query() q: ListUsersQueryDto): Promise<Array<{ id: string; name: string; avatarUrl?: string; shift?: string }>> {
    return await this.usersService.listByCompanyBranch(q.companyTax, q.branchCode)
  }
}
