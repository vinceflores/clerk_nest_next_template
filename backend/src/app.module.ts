import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.cwd() });
@Module({
  imports: [PrismaModule, WebhooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
