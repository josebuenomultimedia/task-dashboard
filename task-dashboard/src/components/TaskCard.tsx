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
      className={`
  p-4 mb-3 rounded-md border 
  ${task.important ? 'border-red-500' : 'border-border'}
  shadow-sm bg-card hover:shadow-md transition
  cursor-grab active:cursor-grabbing flex flex-col gap-2
`}
    >
      {task.important && (
        <span className="text-red-500 text-xs font-medium flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.334-.213 2.986-1.742 2.986H3.48c-1.53 0-2.492-1.652-1.743-2.986L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v3a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
          Importante
        </span>
      )}
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
