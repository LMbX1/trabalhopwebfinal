import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || '';

  try {
    const filmes = await prisma.filme.findMany({
      where: {
        titulo: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    return NextResponse.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return NextResponse.json({ error: 'Erro ao buscar filmes' }, { status: 500 });
  }
}