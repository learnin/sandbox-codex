import React, { useEffect, useState, FormEvent } from 'react';
import { openDB, getAllBooks, addBook, deleteBook } from './db';

export interface Book {
  id?: number;
  title: string;
  author: string;
}

function BookApp() {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    openDB()
      .then(db => {
        setDb(db);
        return getAllBooks(db);
      })
      .then(setBooks);
  }, []);

  const refresh = () => {
    if (!db) return;
    getAllBooks(db).then(setBooks);
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!db || !title || !author) return;
    addBook(db, { title, author }).then(() => {
      setTitle('');
      setAuthor('');
      refresh();
    });
  };

  const handleDelete = (id: number) => {
    if (!db) return;
    deleteBook(db, id).then(refresh);
  };

  return (
    <div className="app">
      <h1>Manage Books</h1>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}{' '}
            <button onClick={() => handleDelete(book.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookApp;
