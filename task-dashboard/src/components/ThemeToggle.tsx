import { useDarkMode } from '../app/hooks';

const ThemeToggle = () => {
  const [enabled, setEnabled] = useDarkMode();

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="
        fixed top-4 right-4 z-50
        flex items-center gap-1
        bg-card border border-border rounded-md
        px-3 py-1 text-xs text-text
        hover:bg-border transition
        dark:bg-border dark:hover:bg-card
        shadow
      "
    >
      {enabled ? (
        <>
          🌙 <span className="hidden sm:inline">Oscuro</span>
        </>
      ) : (
        <>
          ☀️ <span className="hidden sm:inline">Claro</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
