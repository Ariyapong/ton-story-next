import styles from "#/components/Header/header.module.css";
import React from "react";

function Header() {
  return (
    <header className={styles.container}>
      <div className={`${styles.hero} hero`}>
        <h1>Logos</h1>
      </div>
      <nav className={`${styles.navigation}`}>
        <ul className={`${styles.urlList} tw-space-x-2`}>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/">About</a>
            </li>
            <li>
                <a href="/fun-staff">Fun Staff</a>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
