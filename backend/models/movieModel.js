import { getDatabase } from '../config/database.js';

export const showtimes = ['12:30 PM', '03:45 PM', '06:30 PM', '09:15 PM'];

export const movieCatalog = [
  { id: 'orbit', title: 'Beyond the Orbit', genre: 'SCI-FI · ADVENTURE', rating: '8.7', duration: 128, price: 240, color: '#4f75a8', image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1000&q=85', description: 'A quiet mission at the edge of the solar system becomes humanity’s last chance to come home.' },
  { id: 'midnight', title: 'Midnight in Kyoto', genre: 'DRAMA · ROMANCE', rating: '8.2', duration: 112, price: 210, color: '#9a5364', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85', description: 'Two strangers, one rainy night, and a city that keeps their secrets.' },
  { id: 'wild', title: 'The Wild Signal', genre: 'THRILLER · MYSTERY', rating: '7.9', duration: 106, price: 200, color: '#587256', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85', description: 'A remote radio host hears a message that was never meant to reach anyone.' },
  { id: 'laugh', title: 'Good Things Happen', genre: 'COMEDY · FEEL-GOOD', rating: '8.4', duration: 98, price: 190, color: '#ad8052', image: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1000&q=85', description: 'A small-town bakery, a big-city plan, and one very unexpected detour.' },
  { id: 'deepblue', title: 'Into the Deep Blue', genre: 'DOCUMENTARY · NATURE', rating: '9.1', duration: 91, price: 180, color: '#417d8b', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85', description: 'Discover the extraordinary world hiding beneath the ocean surface.' },
  { id: 'lastlight', title: 'The Last Lightkeeper', genre: 'DRAMA · MYSTERY', rating: '8.0', duration: 119, price: 220, color: '#986345', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85', description: 'On a windswept island, a keeper’s final winter brings the past ashore.' },
];

export async function seedMovies() {
  const database = getDatabase();
  if (!database) return;
  for (const movie of movieCatalog) {
    await database.collection('movies').updateOne({ id: movie.id }, { $setOnInsert: movie }, { upsert: true });
  }
}

export async function listMovies() {
  const database = getDatabase();
  const rows = database ? await database.collection('movies').find({}).toArray() : movieCatalog;
  return rows.map(({ _id, ...movie }) => movie);
}

export async function findMovie(movieId) {
  const database = getDatabase();
  return database ? database.collection('movies').findOne({ id: movieId }) : movieCatalog.find(movie => movie.id === movieId);
}
