import { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../store/ProductContext'
import styles from './ProductDetail.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../store/CartContext'

const ProductDetail = () => {
  const { products, getProducts } = useContext(ProductContext)
  const { addProduct } = useContext(CartContext)
  const [qty, setQty] = useState(1)
  const { id } = useParams()

  const product = products.find((p) => p.id === id)

  const navigate = useNavigate()

  const dec = () => setQty(q => Math.max(1, q - 1))
  const inc = () => setQty(q => q + 1)
  const handleChange = (v) => {
    const n = Number(v)
    if (Number.isNaN(n)) return
    setQty(Math.max(1, Math.floor(n)))
  }

  useEffect(() => {
    getProducts()
  }, [])

  if (!product) return (<p>Cargando Producto</p>)

  return (
    <section className={styles.detail}>
      <div className={styles.media}>
        <img src={product.image_url} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>

        {product.description && <p className={styles.desc}>{product.description}</p>}

        <div className={styles.meta}>
          <span className={styles.price}>${product.price}</span>
        </div>

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

        <div className={styles.actions}>
          <button className={styles.add} onClick={() => addProduct(product, qty)}>
            Agregar
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
