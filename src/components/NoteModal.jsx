import { useEffect } from 'react';
import styles from './NoteModal.module.css';
import '../fonts.css';

function NoteModal({ activeNote, updateNote, closeModal }) {
  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  if (!activeNote) return null;

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
          value={activeNote.text}
          onChange={(e) => updateNote(e.target.value)}
        />
      </div>
    </div>
  );
}

export default NoteModal;
