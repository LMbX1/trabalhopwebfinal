import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const generos = await prisma.genero.findMany();
  return NextResponse.json(generos);
}

export async function POST(request: Request) {
  try {
    const { nome } = await request.json();
    if (!nome) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 });
    }
    
    const genero = await prisma.genero.create({ data: { nome } });
    return NextResponse.json(genero, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar gênero' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    
    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }
    
    
    const genero = await prisma.genero.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Gênero deletado com sucesso', genero });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar gênero' }, { status: 500 });
  }
}