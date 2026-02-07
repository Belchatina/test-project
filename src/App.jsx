import { useEffect, useState } from 'react';
import NoteModal from './components/NoteModal';
import styles from './App.module.css';
import './fonts.css';

// Изначальная заметка
const DEFAULT_NOTE = {
  id: Date.now(), // Для уникальности
  text: 'Новая заметка',
};

function App() {
  // Получаем изначальные заметки, если есть в localStorage (если нет - располагаем только изначальную)
  const getInitialNotes = () => {
    const saved = localStorage.getItem('notes');
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.length ? parsed : [DEFAULT_NOTE];
  };

  const initialNotes = getInitialNotes();

  const [notes, setNotes] = useState(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState(null);

  // При изменении notes добавляем в localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  // Создание заметки
  const createNote = () => {
    const newNote = {
      id: Date.now(),
      text: 'Новая заметка',
    };

    setNotes([newNote, ...notes]); // Обновляем notes
    setActiveNoteId(newNote.id); // Обновляем activeNoteId
  };

  // Обновление заметки
  const updateNote = (text) => {
    setNotes(
      notes.map((note) =>
        note.id === activeNoteId ? { ...note, text } : note,
      ),
    );
  };

  // Удаление
  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  // Закрытие модального окна
  const closeModal = () => setActiveNoteId(null);

  return (
    <div className={styles.container}>
      <h1>Заметки</h1>
      {/* Заметки */}
      <div className={styles.notesContainer}>
        {notes.map((note) => (
          <div
            key={note.id}
            className={styles.noteCard}
            onClick={() => setActiveNoteId(note.id)}
          >
            <span>{note.text.slice(0, 200) || 'Без текста'}</span>
            <button
              className={styles.deleteNote}
              onClick={(e) => {
                e.stopPropagation();
                deleteNote(note.id);
              }}
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </button>
          </div>
        ))}
      </div>
      {/* Модальное окно редактирования*/}
      <NoteModal
        activeNote={activeNote}
        updateNote={updateNote}
        closeModal={closeModal}
      />

      <span
        className={`material-symbols-outlined ${styles.newNoteButton}`}
        onClick={createNote}
      >
        note_add
      </span>
    </div>
  );
}

export default App;
