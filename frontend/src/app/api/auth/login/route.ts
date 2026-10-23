import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { signJwtToken } from '../../../../lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signJwtToken({ sub: user.id, email: user.email, name: user.name });

    return NextResponse.json({
      access_token: token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Authentication error' }, { status: 500 });
  }
}
