import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    const where = category && category !== 'All' ? { category } : {};
    return this.prisma.project.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.project.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Project not found');
    return item;
  }

  async create(data: any) {
    return this.prisma.project.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
