'use client';
import { useTheme } from '../../services/ThemeContext';

const ThemeToggle = () => {
  //  const { theme, setTheme } = useContext(themeContext);

  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <label htmlFor="">
        <input
          type="radio"
          value={'light'}
          checked={theme === 'light'}
          onChange={() => toggleTheme && toggleTheme('light')}
        />{' '}
        Light
      </label>
      <label style={{ marginLeft: '5px' }}>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => toggleTheme && toggleTheme('dark')}
        />
        Dark
      </label>
    </div>
  );
};

export default ThemeToggle;
