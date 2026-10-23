import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';
import { initialEducations } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let educations = await prisma.education.findMany({
      orderBy: { order: 'asc' },
    });

    if (educations.length === 0) {
      for (const e of initialEducations) {
        const { id, ...data } = e;
        await prisma.education.create({ data });
      }
      educations = await prisma.education.findMany({
        orderBy: { order: 'asc' },
      });
    }

    return NextResponse.json(educations);
  } catch (error: any) {
    console.error('Error fetching education:', error);
    return NextResponse.json(initialEducations);
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

    const education = await prisma.education.create({
      data,
    });

    return NextResponse.json(education);
  } catch (error: any) {
    console.error('Error creating education:', error);
    return NextResponse.json({ message: 'Failed to create education' }, { status: 500 });
  }
}
