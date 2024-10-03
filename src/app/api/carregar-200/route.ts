import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const movieTitles = [
  "The Shawshank Redemption", "The Godfather", "The Dark Knight", "Pulp Fiction", "The Lord of the Rings: The Return of the King",
  "Forrest Gump", "Inception", "Fight Club", "The Matrix", "Goodfellas",
  "The Empire Strikes Back", "The Silence of the Lambs", "The Green Mile", "Interstellar", "Gladiator",
  "The Usual Suspects", "Se7en", "The Departed", "Schindler's List", "The Lion King",
  "Back to the Future", "Braveheart", "Jurassic Park", "Titanic", "The Prestige",
  "The Intouchables", "Whiplash", "The Dark Knight Rises", "Memento", "The Great Dictator",
  "The Pianist", "The Wolf of Wall Street", "The Breakfast Club", "Saving Private Ryan", "Django Unchained",
  "The Shining", "A Clockwork Orange", "The Social Network", "The Terminator", "The Good, the Bad and the Ugly",
  "12 Angry Men", "The Silence of the Lambs", "The Green Book", "La La Land", "Parasite",
  "Spirited Away", "The Truman Show", "The Avengers", "Guardians of the Galaxy", "The Revenant",
  "The Shape of Water", "Her", "Birdman", "Mad Max: Fury Road", "Arrival",
  "The Exorcist", "The Wizard of Oz", "Finding Nemo", "The Incredibles", "Inside Out",
  "Up", "Coco", "Zootopia", "Toy Story", "Ratatouille",
  "Shrek", "Frozen", "Despicable Me", "Monsters, Inc.", "The Lego Movie",
  "Joker", "Deadpool", "Wonder Woman", "Spider-Man: Into the Spider-Verse", "Black Panther",
  "The Lion King", "Moana", "Finding Dory", "Kung Fu Panda", "How to Train Your Dragon",
  "The Secret Life of Pets", "Sing", "Hotel Transylvania", "Cloudy with a Chance of Meatballs", "Wreck-It Ralph",
  "Trolls", "The Boss Baby", "The Angry Birds Movie", "A Beautiful Mind", "The Social Network",
  "The King's Speech", "12 Years a Slave", "Moonlight", "Spotlight", "The Shape of Water",
  "Nomadland", "Minari", "The Father", "Promising Young Woman", "CODA",
  "Everything Everywhere All at Once", "La La Land", "The Favourite", "Room", "Birdman",
  "The Grand Budapest Hotel", "The Shape of Water", "Spotlight", "Dune", "The Power of the Dog",
  "The Trial of the Chicago 7", "Joker", "Marriage Story", "Once Upon a Time in Hollywood", "Knives Out",
  "Ford v Ferrari", "The Irishman", "Parasite", "Jojo Rabbit", "The Lighthouse",
  "Uncut Gems", "The Farewell", "A Star Is Born", "Bohemian Rhapsody", "Rocketman",
  "1917", "The Invisible Man", "A Quiet Place", "Get Out", "It Follows",
  "Hereditary", "The Witch", "Midsommar", "The Babadook", "The Conjuring",
  "Sinister", "The Cabin in the Woods", "Don't Breathe", "Us", "The Ring",
  "Saw", "Paranormal Activity", "It", "The Grudge", "The Exorcism of Emily Rose",
  "The Texas Chain Saw Massacre", "Halloween", "Friday the 13th", "Scream", "A Nightmare on Elm Street",
  "The Sixth Sense", "The Others", "The Descent", "It Follows", "Midsommar",
  "The Invisible Man", "Get Out", "Us", "Hereditary", "The Witch",
  "The Babadook", "The Cabin in the Woods", "Sinister", "The Conjuring", "It",
  "Paranormal Activity", "Saw", "The Exorcist", "The Shining", "The Texas Chain Saw Massacre",
  "Scream", "Halloween", "Friday the 13th", "A Nightmare on Elm Street", "Psycho",
  "The Silence of the Lambs", "Jaws", "Alien", "The Thing", "The Fly",
  "The Cabin in the Woods", "The Descent", "The Witch", "The Babadook", "It Follows",
  "Hereditary", "The Invisible Man", "Get Out", "Us", "Sinister",
  "Paranormal Activity", "Saw", "The Exorcist", "The Shining", "The Texas Chain Saw Massacre",
  "Scream", "Halloween", "Friday the 13th", "A Nightmare on Elm Street", "The Grudge",
  "The Ring", "The Conjuring", "The Nun", "Annabelle", "The Curse of La Llorona",
  "It", "Scary Stories to Tell in the Dark", "The Autopsy of Jane Doe", "Happy Death Day", "Truth or Dare",
  "The Boy", "The Possession", "The Taking of Deborah Logan", "The Purge", "The Visit",
  "The Nightmare on Elm Street", "The Conjuring", "The Exorcist", "Saw", "Final Destination",
  "A Quiet Place", "Get Out", "The Invisible Man", "Hereditary", "Midsommar",
  "The Witch", "The Cabin in the Woods", "The Babadook", "It Follows", "Sinister",
  "The Descent", "The Ring", "The Grudge", "The Conjuring", "The Nun",
  "The Curse of La Llorona", "Annabelle", "The Possession", "The Taking of Deborah Logan", "The Purge",
  "The Visit", "Happy Death Day", "Truth or Dare", "The Boy", "The Autopsy of Jane Doe",
  "The Haunting of Hill House", "Gerald's Game", "Doctor Sleep", "The Outsider", "The Stand",
  "Locke & Key", "Castle Rock", "Midnight Mass", "The Haunting of Bly Manor", "The Chilling Adventures of Sabrina",
  "American Horror Story", "Stranger Things", "Bates Motel", "Penny Dreadful", "Channel Zero",
  "Fear the Walking Dead", "The Walking Dead", "The 100", "Dark", "The Leftovers",
  "The X-Files", "Twin Peaks", "True Detective", "Dexter", "Breaking Bad",
  "Better Call Saul", "Ozark", "Narcos", "Mindhunter", "The Sinner",
  "The Fall", "The Killing", "Top of the Lake", "Hannibal", "Sharp Objects",
  "Banshee", "The Bridge", "Fargo", "Killing Eve", "Mr. Robot",
  "The Handmaid's Tale", "The Mandalorian", "The Boys", "Watchmen", "The Umbrella Academy",
  "Lovecraft Country", "Raised by Wolves", "Westworld", "Altered Carbon", "The Expanse",
  "The Witcher", "The Falcon and the Winter Soldier", "WandaVision", "Loki", "Hawkeye",
  "Ms. Marvel", "Moon Knight", "She-Hulk: Attorney at Law", "What If...?", "Secret Invasion",
  "The Book of Boba Fett", "Andor", "Stranger Things", "Cobra Kai", "The Crown",
  "The Queen's Gambit", "Money Heist", "Dark", "The Umbrella Academy", "The Witcher",
  "The Mandalorian", "Loki", "WandaVision", "Hawkeye", "Ms. Marvel",
  "Moon Knight", "Secret Invasion", "Star Trek: Strange New Worlds", "The Orville", "Lost in Space",
  "Shadow and Bone", "The Wheel of Time", "American Horror Stories", "The Chilling Adventures of Sabrina", "The Haunting of Hill House",
  "The Haunting of Bly Manor", "The Outsider", "Lovecraft Country", "Penny Dreadful", "The Walking Dead",
  "Fear the Walking Dead", "Better Call Saul", "Breaking Bad", "Narcos", "The Sopranos",
  "The Wire", "Ozark", "The Leftovers", "Dexter", "True Detective",
  "The Killing", "Top of the Lake", "Killing Eve", "Fargo", "The Fall",
  "The Bridge", "Banshee", "Hannibal", "Sharp Objects", "The Sinner",
  "Mr. Robot", "The Boys", "Watchmen", "The Expanse", "Altered Carbon",
  "Stranger Things", "The Witcher", "The Mandalorian", "The Crown", "The Queen's Gambit",
  "Money Heist", "Cobra Kai", "Loki", "WandaVision", "Hawkeye",
  "Ms. Marvel", "Moon Knight", "Secret Invasion", "The Book of Boba Fett", "Andor"
];

const genres = [
  "Drama", "Crime", "Action", "Adventure", "Fantasy",
];

const generoMap: { [key: string]: number } = {};

export const seedDatabase = async () => {
    try {

      for (const nome of genres) {
        const existingGenero = await prisma.genero.findUnique({
          where: { nome },
        });
  
        if (existingGenero) {
          generoMap[nome] = existingGenero.id;
        } else {
          const genero = await prisma.genero.create({
            data: { nome },
          });
          generoMap[nome] = genero.id;
        }
      }
  
      const API_KEY = '305e8840';
      const fetchedMovies = await Promise.all(
        movieTitles.map(async (title) => {
          const response = await fetch(`https://omdbapi.com/?t=${title}&apikey=${API_KEY}`);
          return response.json();
        })
      );
  
      const validMovies = fetchedMovies.filter(movie => movie.Response === "True");
  
      for (const movie of validMovies) {
        const generoNome = movie.Genre.split(', ')[0]; 
        const generoId = generoMap[generoNome] || generoMap['Drama'];
  
        await prisma.filme.create({
          data: {
            titulo: movie.Title,
            ano: parseInt(movie.Year),
            diretor: movie.Director,
            generoId: generoId,
          },
        });
      }
    } catch (error) {
      console.error("Erro ao seed database:", error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };
  
  export async function GET() {
    try {
      await seedDatabase();
      return NextResponse.json({ message: 'Filmes carregados com sucesso!' });
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
      return NextResponse.json({ message: 'Erro ao carregar filmes: ' + (error as Error).message }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }