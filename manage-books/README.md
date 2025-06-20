# Manage Books

This is a simple library management application built with React and TypeScript.
It uses the browser's IndexedDB to store a list of books locally and is built using Vite.

## Setup
Install dependencies with `npm install` from the `manage-books` directory.

## Usage
To start developing run:

```
npm run dev
```

This launches Vite's dev server. Open the printed URL in your browser.
Add books with a title and author. The data persists in IndexedDB between reloads.

When you build for production (`npm run build`), Vite automatically rewrites the
`<script>` tag in `index.html` to point at the generated JavaScript bundle. The
original `src/main.tsx` path is only used during development.

To create a production build run `npm run build`.

## Testing
Run `npm test` to execute the Vitest test suite.
