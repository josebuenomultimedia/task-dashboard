import { useAppDispatch } from '../app/hooks';
import {
  updateTaskStatusInAPI,
  deleteTaskFromAPI,
} from '../features/tasks/tasksSlice';
import type { Task } from '../features/tasks/tasksSlice';
import { motion } from 'framer-motion';

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const dispatch = useAppDispatch();

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
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="
        p-3 sm:p-4 md:p-5
        mb-2 sm:mb-3
        rounded-lg
        border border-gray-200
        shadow-md
        bg-white
        hover:shadow-lg
        transition
        cursor-grab active:cursor-grabbing
      "
    >
      <div className="flex flex-col gap-1 flex-1">
        <p className="text-sm sm:text-base font-normal text-gray-700">
          {task.title}
        </p>
        <span
          className={`text-[11px] sm:text-xs font-medium rounded px-2 py-0.5 ${
            task.status === 'todo'
              ? 'bg-gray-200 text-gray-800'
              : task.status === 'in-progress'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {task.status === 'todo'
            ? 'Por hacer'
            : task.status === 'in-progress'
              ? 'En progreso'
              : 'Hecho'}
        </span>
      </div>

      <div className="flex gap-1 sm:gap-2 mt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleMove}
          title="Mover tarea"
          className="text-gray-500 hover:text-gray-700"
        >
          🔄
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleRemove}
          title="Eliminar tarea"
          className="text-gray-500 hover:text-gray-700"
        >
          🗑
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
