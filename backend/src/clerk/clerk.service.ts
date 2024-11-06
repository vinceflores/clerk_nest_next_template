import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
@Injectable()
export class ClerkService {
  constructor(private prisma: PrismaService) {}

  /**
   * Handles the webhook events from clerk
   * @param evt is the event object from clerk
   * @returns a response
   */

  async handleWebhook(evt: any, res: Response) {
    const { id } = evt.data;
    const eventType = evt.type;
    // console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    // console.log('Webhook body:', evt.data);
    try {
      if (evt.type == 'user.created' || evt.type == 'user.updated') {
        await this.handleUserCreatedOrUpdated(evt);
      } else if (evt.type == 'user.deleted') {
        await this.handleUserDeleted(evt);
      }
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json([]);
    }

    return res.status(HttpStatus.OK).json([]);
  }

  private async handleUserCreatedOrUpdated(evt: any) {
    // return await this.prisma.
    const data = evt.data;
    await this.prisma.user.upsert({
      where: {
        clerkId: data.id,
      },
      create: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
      },
      update: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
      },
    });
  }
  private async handleUserDeleted(evt: any) {
    const data = evt.data;
    // return await this.prisma.
    await this.prisma.user.delete({
      where: {
        clerkId: data.id!,
      },
    });
  }
}
