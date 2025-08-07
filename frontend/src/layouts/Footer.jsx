import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import styles from './Footer.module.css'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <h3>Skincare</h3>
        <p>Siguenos</p>
        <div className={styles.socialIcons}>
          <a href='https://twitter.com' target='_blank' rel='noreferrer'><FaTwitter /></a>
          <a href='https://instagram.com' target='_blank' rel='noreferrer'><FaInstagram /></a>
          <a href='https://facebook.com' target='_blank' rel='noreferrer'><FaFacebook /></a>
        </div>
      </div>

      <div className={styles.column}>
        <h4>Productos</h4>
        <p>Categoría 1</p>
        <p>Categoría 2</p>
        <p>Categoría 3</p>
      </div>

      <div className={styles.column}>
        <h4>Contacto</h4>
        <p>9 8765 4321</p>
        <p>email@skincare.cl</p>
      </div>
    </footer>
  )
}

export default Footer
