import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAppDispatch } from '../app/hooks';
import { clearCredentials } from '../features/auth/authSlice';
import { clearTasks } from '../features/tasks/tasksSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Props {
  onClose: () => void;
}

const DeleteAccountModal: React.FC<Props> = ({ onClose }) => {
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (confirmText !== 'QUIERO ELIMINAR MI CUENTA') {
      toast.error('La confirmación no coincide.');
      return;
    }

    if (!password) {
      toast.error('La contraseña es obligatoria.');
      return;
    }

    try {
      await axiosInstance.delete('/auth/delete-account', {
        data: { password, confirmText },
      });
      toast.success('✅ Cuenta eliminada correctamente.');
      dispatch(clearCredentials());
      dispatch(clearTasks());
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Error al borrar cuenta.');
      } else {
        toast.error('Error desconocido al borrar cuenta.');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-card border border-border p-6 rounded-md shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2 text-error">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-text mb-4">
          Esta acción eliminará tu cuenta y todas tus tareas de forma
          permanente.
        </p>
        <p className="text-sm text-muted mb-2">
          Para confirmar, escribe exactamente:
        </p>
        <p className="text-xs font-mono bg-muted/10 p-2 rounded mb-2 text-text">
          QUIERO ELIMINAR MI CUENTA
        </p>
        <input
          type="text"
          placeholder="Confirmación"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full bg-card border-2 border-border rounded-md px-3 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-card border-2 border-border rounded-md px-3 py-2 text-sm text-text placeholder-muted shadow-sm focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-border rounded-md text-text hover:bg-border transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-error hover:bg-red-700 text-white rounded-md transition"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
