// src/components/ProductCard.jsx
import styles from './ProductCard.module.css'

const ProductCard = ({ title, desc, price, img }) => {
  return (
    <div className={styles.card}>
      <img src={img} alt={title} className={styles.image} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.desc}>{desc}</p>
        <p className={styles.price}>{price}</p>
        <button className={styles.button}>Añadir al carrito</button>
      </div>
    </div>
  )
}

export default ProductCard
