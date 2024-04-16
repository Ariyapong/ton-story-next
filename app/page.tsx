import styles from './page.module.css'
import ThemeSwitcher from "#/components/ThemeSwitcher";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <div className={styles.indexContainer}>
      <h1>Hello, Home page!</h1>
      <ThemeSwitcher />
    </div>
  );
}
