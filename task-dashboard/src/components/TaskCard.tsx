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
        p-4
        mb-3
        rounded-md
        border border-border
        shadow-sm
        bg-card
        hover:shadow-md
        transition
        cursor-grab active:cursor-grabbing
        flex flex-col gap-2
      "
    >
      <p className="text-sm font-medium text-text">{task.title}</p>

      <span
        className={`text-xs font-medium rounded px-2 py-0.5 w-fit
          ${
            task.status === 'todo'
              ? 'bg-gray-100 text-muted'
              : task.status === 'in-progress'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-emerald-50 text-emerald-600'
          }
        `}
      >
        {task.status === 'todo'
          ? 'Por hacer'
          : task.status === 'in-progress'
            ? 'En progreso'
            : 'Hecho'}
      </span>

      <div className="flex gap-2 mt-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleMove}
          title="Mover tarea"
          className="text-muted hover:text-primary transition text-sm"
        >
          Mover
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleRemove}
          title="Eliminar tarea"
          className="text-muted hover:text-error transition text-sm"
        >
          Eliminar
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
