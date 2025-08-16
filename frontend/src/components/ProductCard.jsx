import styles from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ id, title, desc, price, img }) => {
  const navigate = useNavigate()
  return (
    <div className={styles.card}>
      <img src={img} alt={title} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{price}</p>
        <button className={styles.button} onClick={() => navigate(`/products/${id}`)}>Ver detalle</button>
      </div>
    </div>
  )
}

export default ProductCard
