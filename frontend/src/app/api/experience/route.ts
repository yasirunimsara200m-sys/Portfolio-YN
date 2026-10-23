import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';
import { initialExperiences } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });

    if (experiences.length === 0) {
      for (const e of initialExperiences) {
        const { id, ...data } = e;
        await prisma.experience.create({ data });
      }
      experiences = await prisma.experience.findMany({
        orderBy: { order: 'asc' },
      });
    }

    return NextResponse.json(experiences);
  } catch (error: any) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(initialExperiences);
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getAuthUser(req);
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    const experience = await prisma.experience.create({
      data,
    });

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ message: 'Failed to create experience' }, { status: 500 });
  }
}
