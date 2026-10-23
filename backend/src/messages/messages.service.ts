import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { name: string; email: string; subject?: string; message: string }) {
    return this.prisma.message.create({
      data,
    });
  }

  async markAsRead(id: string) {
    const msg = await this.prisma.message.findUnique({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    return this.prisma.message.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }

  async getDashboardStats() {
    const [projectCount, skillCount, experienceCount, messageCount, unreadMessages] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.skill.count(),
      this.prisma.experience.count(),
      this.prisma.message.count(),
      this.prisma.message.count({ where: { isRead: false } }),
    ]);

    return {
      projectCount,
      skillCount,
      experienceCount,
      messageCount,
      unreadMessages,
    };
  }
}
