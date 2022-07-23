import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>Страница не найдена</h1>
      <p>Попробуйте позже или перезагрузите страницу</p>
      <span>😢</span>
    </div>
  );
};

export default NotFound;
