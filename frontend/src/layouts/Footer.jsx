import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa'
import styles from './Footer.module.css'
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>

        <div className={styles.column}>
          <h3 className={styles.brand}>Skincare</h3>
          <p className={styles.tagline}>Cuidamos tu piel, todos los días.</p>

          <p className={styles.follow}>Síguenos</p>
          <div className={styles.socialIcons}>
            <a href='https://twitter.com' target='_blank' rel='noreferrer' aria-label='Twitter'>
              <FaTwitter />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram'>
              <FaInstagram />
            </a>
            <a href='https://facebook.com' target='_blank' rel='noreferrer' aria-label='Facebook'>
              <FaFacebook />
            </a>
          </div>
        </div>

        <nav className={styles.column} aria-label='Navegación'>
          <h4>Explorar</h4>
          <ul className={styles.linkList}>
            <li><a href='/'>Inicio</a></li>
            <li><a href='/products'>Comprar</a></li>
          </ul>
        </nav>

        <div className={styles.column}>
          <h4>Contacto</h4>
          <p>📞 9 8765 4321</p>
          <p>✉️ <a href='mailto:email@skincare.cl'>email@skincare.cl</a></p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {year} Skincare. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
