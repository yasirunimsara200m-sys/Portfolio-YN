import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: [{ order: 'asc' }, { category: 'asc' }],
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.skill.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Skill not found');
    return item;
  }

  async create(data: { name: string; category: string; proficiency?: number; order?: number }) {
    return this.prisma.skill.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.skill.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.skill.delete({ where: { id } });
  }
}
