import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';
import { initialSkills } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let skills = await prisma.skill.findMany({
      orderBy: [{ order: 'asc' }, { category: 'asc' }],
    });

    if (skills.length === 0) {
      for (const s of initialSkills) {
        const { id, ...data } = s;
        await prisma.skill.create({ data });
      }
      skills = await prisma.skill.findMany({
        orderBy: [{ order: 'asc' }, { category: 'asc' }],
      });
    }

    return NextResponse.json(skills);
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(initialSkills);
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

    const skill = await prisma.skill.create({
      data,
    });

    return NextResponse.json(skill);
  } catch (error: any) {
    console.error('Error creating skill:', error);
    return NextResponse.json({ message: 'Failed to create skill' }, { status: 500 });
  }
}
