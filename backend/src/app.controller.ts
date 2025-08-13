import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  constructor() {}

  @Get('health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
