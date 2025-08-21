import styles from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { Heart } from 'lucide-react'
import { UserContext } from '../store/UserContext'

const ProductCard = ({ id, title, desc, price, img, isinWishlist }) => {
  const navigate = useNavigate()
  const [inWishlist, setInWishlist] = useState(isinWishlist)
  const { profile, addToWishlist, deleteFromWishlist } = useContext(UserContext)

  const toggleWishlist = () => {
    const newValue = !inWishlist
    setInWishlist(!inWishlist)

    if (newValue === true) {
      console.log('agregando')
      addToWishlist(id, profile.id)
    } else if (newValue === false) {
      console.log('eliminando')
      deleteFromWishlist(id, profile.id)
    }
  }

  return (
    <div className={styles.card}>
      <img src={img} alt={title} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{price}</p>
        <button className={styles.button} onClick={() => navigate(`/products/${id}`)}>Ver detalle</button>
        <button
          className={`${styles.wishlistButton} ${inWishlist ? styles.active : ''}`}
          onClick={toggleWishlist}
          aria-label='Agregar a wishlist'
        >
          <Heart fill={inWishlist ? '#383737' : 'none'} color='#383737' strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
