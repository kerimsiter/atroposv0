import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto'

const prisma = new PrismaClient()
const hashPin = (pin: string) => crypto.createHash('sha256').update(pin, 'utf8').digest('hex')

async function main() {
  // Company
  const company = await prisma.company.upsert({
    where: { taxNumber: '1111111111' },
    update: {},
    create: {
      name: 'Happier Co',
      taxNumber: '1111111111',
      taxOffice: 'Istanbul',
      address: 'Istanbul TR',
      phone: '+90 555 000 0000',
      email: 'info@happier.local',
    },
  })

  // Branch
  const branch = await prisma.branch.upsert({
    where: { companyId_code: { companyId: company.id, code: 'IST01' } },
    update: {},
    create: {
      companyId: company.id,
      code: 'IST01',
      name: 'Main Branch',
      address: 'Istanbul TR',
      phone: '+90 555 000 0001',
      isMainBranch: true,
    },
  })

  // Users with PINs 1234 / 2580 / 0000
  const usersData = [
    { username: 'kim', firstName: 'Kimberly', lastName: 'Lee', role: 'CASHIER', pin: '1234' },
    { username: 'ant', firstName: 'Antony', lastName: 'Stone', role: 'WAITER', pin: '2580' },
    { username: 'bud', firstName: 'Budy', lastName: 'Hart', role: 'CASHIER', pin: '0000' },
  ] as const

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {
        companyId: company.id,
        branchId: branch.id,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role as any,
        pin: hashPin(u.pin),
        password: hashPin('password'),
        active: true,
      },
      create: {
        username: u.username,
        companyId: company.id,
        branchId: branch.id,
        firstName: u.firstName,
        lastName: u.lastName,
        role: u.role as any,
        pin: hashPin(u.pin),
        password: hashPin('password'),
        active: true,
      },
    })
  }

  console.log('Seed completed:', { companyTax: company.taxNumber, branchCode: branch.code })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
