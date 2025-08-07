import Button from '../components/NavbarButton'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className={styles.customNav}>
      <div className={styles.btnWrapper}>
        <Button textButton='Inicio' to='/' />
        <Button textButton='Comprar' to='/products' />
        <Button textButton='Saber más' to='/#discover' />
      </div>

      <Link to='/' className={styles.logo}>Skincare</Link>

      <div className={styles.iconWrapper}>
        <Link to='/profile' className={styles.iconLink}><FaUser /></Link>
        <Link to='/cart' className={styles.iconLink}><FaShoppingCart /></Link>
      </div>
    </nav>
  )
}

export default Navbar
