import styles from '../styles/spinner.module.css'

const Spinner = () => {
  return (
    <div className={styles.spinner} aria-label='spinner-icon'>
      <div className={styles.spinner_circle}></div>
    </div>
  )
}

export default Spinner