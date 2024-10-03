import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { titulo, ano, generoId, diretor } = await req.json();

    if (!titulo || !ano || !generoId || !diretor) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    const filme = await prisma.filme.create({
      data: {
        titulo,
        ano: parseInt(ano),
        generoId: parseInt(generoId),
        diretor,
      },
    });

    return NextResponse.json(filme, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar o filme' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    const filme = await prisma.filme.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Filme deletado com sucesso', filme });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar filme' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filmes = await prisma.filme.findMany({
      include: {
        genero: true,
      },
    });

    const filmesComGenero = filmes.map((filme) => ({
      id: filme.id,
      titulo: filme.titulo,
      ano: filme.ano,
      generoId: filme.generoId,
      diretor: filme.diretor,
      genero: filme.genero.nome,
    }));

    return NextResponse.json(filmesComGenero);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar filmes' }, { status: 500 });
  }
}
