import { useAppDispatch } from '../app/hooks';
import {
  updateTaskStatusInAPI,
  deleteTaskFromAPI,
} from '../features/tasks/tasksSlice';
import type { Task } from '../features/tasks/tasksSlice'; // ← aquí el cambio
import { motion } from 'framer-motion';

interface Props {
  task: Task;
}

const getColorClasses = (status: string) => {
  switch (status) {
    case 'todo':
      return 'bg-blue-100 border-blue-400';
    case 'in-progress':
      return 'bg-yellow-100 border-yellow-400';
    case 'done':
      return 'bg-green-100 border-green-400';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const cardColor = getColorClasses(task.status);

  const nextStatus = {
    todo: 'in-progress',
    'in-progress': 'done',
    done: 'todo',
  } as const;

  const handleMove = () => {
    dispatch(
      updateTaskStatusInAPI({
        id: task._id,
        status: nextStatus[task.status],
      })
    );
  };

  const handleRemove = () => {
    dispatch(deleteTaskFromAPI(task._id));
  };

  const handleDrop = (event: MouseEvent) => {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (!target) return;

    const column = (target as HTMLElement).closest(
      '[data-status]'
    ) as HTMLElement;
    if (!column) return;

    const newStatus = column.getAttribute('data-status') as
      | 'todo'
      | 'in-progress'
      | 'done';

    if (newStatus && newStatus !== task.status) {
      dispatch(
        updateTaskStatusInAPI({
          id: task._id,
          status: newStatus,
        })
      );
    }
  };

  return (
    <motion.div
      layout
      drag
      onDragEnd={(e) => handleDrop(e as unknown as MouseEvent)}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      className={`p-3 mb-3 rounded-xl border shadow-sm flex justify-between items-center transition-transform duration-200 hover:scale-[1.02] ${cardColor} cursor-grab active:cursor-grabbing`}
    >
      <p className="text-sm font-medium text-gray-800 flex-1">{task.title}</p>

      <div className="flex gap-2 text-base">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleMove}
          title="Mover tarea"
          className="text-blue-600 hover:text-blue-800"
        >
          🔁
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleRemove}
          title="Eliminar tarea"
          className="text-red-500 hover:text-red-700"
        >
          ✖
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
