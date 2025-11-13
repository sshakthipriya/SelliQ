import styles from "./sidebar.module.scss";

const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <div className={styles.logo}>
        <img src="src/assets/selliq-logo.png" height={180} width={180}></img>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.listItem}>
            <div>Investors</div>
            <img src="src/assets/email.svg"></img>
          </li>
          <li className={styles.listItem}>
            <div>Emails Sense</div>
            <img src="src/assets/email.svg"></img>
          </li>
          <li className={styles.listItem}>
            <div>Competitors</div>
            <img src="src/assets/email.svg"></img>
          </li>
        </ul>
      </nav>
      <div className={styles.help}>
        <div>Help</div>
        <img src="src/assets/email.svg"></img>
      </div>
    </aside>
  );
};

export default SideBar;
