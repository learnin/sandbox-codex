// IndexedDB helpers are available from db.js
function BookApp() {
  const [db, setDb] = React.useState(null);
  const [books, setBooks] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');

  React.useEffect(() => {
    openDB().then(db => {
      setDb(db);
      return getAllBooks(db);
    }).then(setBooks);
  }, []);

  const refresh = () => {
    if (!db) return;
    getAllBooks(db).then(setBooks);
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!db || !title || !author) return;
    addBook(db, { title, author }).then(() => {
      setTitle('');
      setAuthor('');
      refresh();
    });
  };

  const handleDelete = id => {
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
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(
  <BookApp />,
  document.getElementById('root')
);
