import { describe, it, expect, beforeEach } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { openDB, getAllBooks, addBook, deleteBook } from './db';

beforeEach(() => {
  // reset fake IndexedDB before each test
  (global as any).indexedDB = new IDBFactory();
});

describe('db helpers', () => {
  it('adds and retrieves books', async () => {
    const db = await openDB();
    await addBook(db, { title: 'Book A', author: 'Author A' });
    const books = await getAllBooks(db);
    expect(books.length).toBe(1);
    expect(books[0]).toMatchObject({ title: 'Book A', author: 'Author A' });
  });

  it('deletes books', async () => {
    const db = await openDB();
    const id = await addBook(db, { title: 'Book B', author: 'Author B' });
    await deleteBook(db, id);
    const books = await getAllBooks(db);
    expect(books.length).toBe(0);
  });
});
