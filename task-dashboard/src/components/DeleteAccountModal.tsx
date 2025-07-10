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
      <div className="bg-white p-6 rounded shadow max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-2 text-red-700">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Esta acción eliminará tu cuenta y todas tus tareas de forma
          permanente.
        </p>
        <p className="text-sm text-gray-700 mb-2">
          Para confirmar, escribe exactamente:
        </p>
        <p className="text-xs font-mono bg-gray-100 p-2 rounded mb-2">
          QUIERO ELIMINAR MI CUENTA
        </p>
        <input
          type="text"
          placeholder="Confirmación"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
