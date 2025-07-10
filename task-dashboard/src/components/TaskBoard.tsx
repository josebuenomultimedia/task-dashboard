import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';

const TaskBoard = () => {
  const tasks = useSelector((state: RootState) => state.tasks.list);

  const columns = ['todo', 'in-progress', 'done'] as const;
  const labels = {
    todo: 'Por hacer',
    'in-progress': 'En progreso',
    done: 'Hecho',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {columns.map((status) => (
        <motion.div
          key={status}
          data-status={status}
          layout
          className={`bg-card border border-border rounded-md shadow-sm p-4 min-h-[150px] sm:min-h-[250px] flex flex-col gap-2
            ${
              status === 'todo'
                ? 'border-t-4 border-gray-300'
                : status === 'in-progress'
                  ? 'border-t-4 border-primary'
                  : 'border-t-4 border-emerald-400'
            }
          `}
        >
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
            {labels[status]}
          </h2>

          <AnimatePresence mode="popLayout">
            {tasks
              .filter((task) => task.status === status)
              .sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0))
              .map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskBoard;
