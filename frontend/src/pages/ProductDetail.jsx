import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../store/ProductContext'
import { UserContext } from '../store/UserContext'
import styles from './ProductDetail.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../store/CartContext'
import { formatCLP } from '../utils/formatCLP'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'

const ProductDetail = () => {
  const { products, getProducts } = useContext(ProductContext)
  const { addProduct } = useContext(CartContext)
  const { profile, wishlist, addToWishlist, deleteFromWishlist } = useContext(UserContext)
  const [qty, setQty] = useState(1)
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const [inWishlist, setInWishlist] = useState(false)

  const toggleWishlist = () => {
    const newValue = !inWishlist
    setInWishlist(newValue)

    if (newValue === true) {
      addToWishlist(id, profile.id)
    } else if (newValue === false) {
      deleteFromWishlist(id, profile.id)
    }
  }

  const navigate = useNavigate()

  const dec = () => setQty(q => Math.max(1, q - 1))
  const inc = () => setQty(q => q + 1)

  const handleChange = (v) => {
    const n = Number(v)
    if (Number.isNaN(n)) return
    setQty(Math.max(1, Math.floor(n)))
  }

  const handleAdd = () => {
    addProduct(product, qty)
    toast.success('Producto agregado al carrito exitosamente')
  }

  const checkWishlist = () => {
    if (wishlist) {
      const isInWishlist = wishlist.some(p => p.product_id === parseInt(id))
      setInWishlist(isInWishlist)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    setProduct(products.find((p) => p.id === parseInt(id)))
    checkWishlist()
  }, [products])

  if (!product) return (<p>Cargando Producto</p>)

  return (
    <section className={styles.detail}>
      <div className={styles.media}>
        <img src={product.img_url} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>

        {product.description && <p className={styles.desc}>{product.description}</p>}

        <div className={styles.meta}>
          <span className={styles.price}>{formatCLP(product.price)}</span>
        </div>

        <div className={styles.qtySection}>
          <div className={styles.qtyRow} aria-label='Selector de cantidad'>
            <button
              type='button'
              className={styles.qtyBtn}
              onClick={dec}
              aria-label='Disminuir cantidad'
            >
              –
            </button>

            <input
              className={styles.qtyInput}
              type='number'
              min={1}
              value={qty}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={(e) => handleChange(e.target.value)}
              aria-label='Cantidad'
              inputMode='numeric'
              pattern='[0-9]*'
            />

            <button
              type='button'
              className={styles.qtyBtn}
              onClick={inc}
              aria-label='Aumentar cantidad'
            >
              +
            </button>
          </div>

          <button
            type='button'
            className={`${styles.wishlistBtn} ${inWishlist ? styles.active : ''}`}
            onClick={toggleWishlist}
            aria-label='Agregar a wishlist'
          >
            <Heart size={28} strokeWidth={1.5} fill={inWishlist ? '#383737' : 'none'} color='#383737' />
          </button>
        </div>

        <div className={styles.actions}>
          <button className={styles.add} onClick={handleAdd}>
            Agregar al carrito
          </button>

          <button className={styles.ghost} onClick={() => navigate('/products')}>
            Ver todos los productos
          </button>

          <button className={styles.ghost} onClick={() => navigate('/cart')}>
            Ir al carrito de compras
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
