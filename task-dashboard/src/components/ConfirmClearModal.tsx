import React from 'react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmClearModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
      <div className="bg-card border border-border rounded-md shadow-lg max-w-sm w-full p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold text-error">
          Borrar todas las tareas
        </h2>
        <p className="text-sm text-text">
          Esta acción eliminará todas tus tareas. ¿Estás seguro?
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-border rounded-md text-text hover:bg-border transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-error hover:bg-red-700 text-white rounded-md transition"
          >
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmClearModal;
