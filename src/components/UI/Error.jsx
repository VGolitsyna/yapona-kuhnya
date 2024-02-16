import styles from './Loading.module.css';

const Error = () => {
  return(
    <section className={styles.container}>
      <span className={styles.loading}>Произошла ошибка сервера, попробуйте снова.</span>
    </section>
  )
}

export default Error;