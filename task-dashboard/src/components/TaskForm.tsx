import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addTaskToAPI } from '../features/tasks/tasksSlice';
import { toast } from 'react-hot-toast';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Debes escribir un título.');
      return;
    }

    dispatch(addTaskToAPI({ title: title.trim() }))
      .unwrap()
      .then((task) => {
        toast.success('✅ Tarea guardada con éxito');
        console.log('✅ Tarea guardada:', task);
      })
      .catch((err) => {
        const msg = err?.response?.data?.error || 'Error desconocido';
        toast.error(`❌ No se pudo guardar la tarea: ${msg}`);
        console.error('❌ Detalles:', err);
      });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
      >
        ➕ Agregar
      </button>
    </form>
  );
};

export default TaskForm;
