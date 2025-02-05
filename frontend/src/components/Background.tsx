import React from "react";
import styles from "./styles/background.module.css";
function Background({ children }: { children: React.ReactNode }) {
  return <div className={styles.background}>{children}</div>;
}

export default Background;
