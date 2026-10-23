import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '../../../../lib/jwt';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  const auth = getAuthUser(req);
  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: auth.sub },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}
