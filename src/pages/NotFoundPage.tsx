import React from "react";
import { Text } from "@fluentui/react-components";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Text size={900}>404 Page Not Found</Text>
    </div>
  );
};

export default NotFoundPage;