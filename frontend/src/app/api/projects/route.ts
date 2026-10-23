import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';
import { initialProjects } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where = category && category !== 'All' ? { category } : {};

    let projects = await prisma.project.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
    });

    if (projects.length === 0) {
      // Seed default projects if database is empty
      for (const p of initialProjects) {
        const { id, ...data } = p;
        await prisma.project.create({ data });
      }
      projects = await prisma.project.findMany({
        where,
        orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
      });
    }

    return NextResponse.json(projects);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(initialProjects);
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

    const project = await prisma.project.create({
      data,
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Failed to create project' }, { status: 500 });
  }
}
