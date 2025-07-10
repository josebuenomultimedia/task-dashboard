import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addTaskToAPI } from '../features/tasks/tasksSlice';
import { toast } from 'react-hot-toast';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [important, setImportant] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Debes escribir un título.');
      return;
    }

    dispatch(addTaskToAPI({ title: title.trim(), important }))
      .unwrap()
      .then((task) => {
        toast.success('Tarea guardada con éxito');
        console.log('Tarea guardada:', task);
      })
      .catch((err) => {
        const msg = err?.response?.data?.error || 'Error desconocido';
        toast.error(`No se pudo guardar la tarea: ${msg}`);
        console.error('Detalles:', err);
      });

    setTitle('');
    setImportant(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-3">
      <div className="flex w-full items-center gap-2">
        <input
          type="text"
          placeholder="Escribe una nueva tarea..."
          className="flex-1 bg-card border-2 border-border rounded-md px-4 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center bg-primary hover:bg-secondary text-white font-medium px-4 py-2 rounded-md transition"
          title="Agregar tarea"
        >
          +
        </button>
      </div>
      <label className="flex items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
        />
        Marcar como importante
      </label>
    </form>
  );
};

export default TaskForm;
