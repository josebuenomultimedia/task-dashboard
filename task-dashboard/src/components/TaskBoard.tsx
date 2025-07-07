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
          layout // 🎯 permite animación al mover elementos dentro
          className="bg-white p-4 rounded-xl shadow-md min-h-[150px] sm:min-h-[250px]"
        >
          <h2 className="text-lg font-semibold text-indigo-600 mb-3">
            {labels[status]}
          </h2>

          <AnimatePresence mode="popLayout">
            {tasks
              .filter((task) => task.status === status)
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
