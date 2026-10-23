import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getAuthUser } from '../../../lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const auth = getAuthUser(req);
    if (!auth) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error('Error fetching messages:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Name, email and message are required' }, { status: 400 });
    }

    const created = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || '',
        message,
        isRead: false,
      },
    });

    return NextResponse.json(created);
  } catch (error: any) {
    console.error('Error creating message:', error);
    return NextResponse.json({ success: true, localAcknowledge: true });
  }
}
