import { describe, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IDBFactory } from 'fake-indexeddb';
import BookApp from './app';
import '@testing-library/jest-dom';

beforeEach(() => {
  (global as any).indexedDB = new IDBFactory();
});

describe('BookApp component', () => {
  it('renders title', () => {
    render(<BookApp />);
    expect(screen.getByText('Manage Books')).toBeInTheDocument();
  });
});
