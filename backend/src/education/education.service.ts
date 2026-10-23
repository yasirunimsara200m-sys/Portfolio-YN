import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.education.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.education.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.education.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.education.delete({ where: { id } });
  }
}
