import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';
import { initialProfile } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let profile = await prisma.profile.findFirst();
    if (!profile) {
      // Seed default profile if not yet created
      profile = await prisma.profile.create({
        data: initialProfile,
      });
    }
    return NextResponse.json(profile);
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(initialProfile);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const auth = getAuthUser(req);
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const existing = await prisma.profile.findFirst();

    let updated;
    if (existing) {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    } else {
      updated = await prisma.profile.create({
        data,
      });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Failed to update profile' }, { status: 500 });
  }
}
