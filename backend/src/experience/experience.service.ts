import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.experience.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Experience not found');
    return item;
  }

  async create(data: any) {
    return this.prisma.experience.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.experience.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.experience.delete({ where: { id } });
  }
}
