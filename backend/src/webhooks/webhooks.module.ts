import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ClerkService } from './clerk/clerk.service';

@Module({
  imports: [PrismaModule],
  providers: [WebhooksService, PrismaService, ClerkService],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
