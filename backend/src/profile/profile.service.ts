import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst();
    if (!profile) {
      throw new NotFoundException('Profile data not configured');
    }
    return profile;
  }

  async updateProfile(data: any) {
    const existing = await this.prisma.profile.findFirst();
    if (existing) {
      return this.prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    }
    return this.prisma.profile.create({
      data,
    });
  }
}
