import styles from './NavbarButton.module.css'
import { Link } from 'react-router-dom'

const Button = ({ textButton, to, icon }) => {
  return (
    <Link to={to} className={styles.customButton}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {textButton}
    </Link>
  )
}

export default Button
