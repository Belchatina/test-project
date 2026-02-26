import { useEffect, useState } from 'react';
import styles from './NoteModal.module.css';
import '../fonts.css';

function NoteModal({ activeNote, updateNote, closeModal }) {
  const [draft, setDraft] = useState('');

  // Задаем черновик
  useEffect(() => {
    if (activeNote) {
      setDraft(activeNote.text);
    }
  }, [activeNote]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  if (!activeNote) return null;

  const handleSave = () => {
    updateNote(draft);
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          <p>Редактирование заметки</p>
          <button className={styles.button} onClick={closeModal}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <textarea
          className={styles.textarea}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <div className={styles.actions}>
          <button onClick={closeModal}>Отмена</button>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
