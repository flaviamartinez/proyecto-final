import { CartContext } from '../store/CartContext'
import { UserContext } from '../store/UserContext'
import { useContext, useState, useEffect } from 'react'
import styles from './Cart.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Cart = () => {
  const { cart, updateQty, removeProduct, createOrder } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  const { token } = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    setTotal(cart.reduce((sum, product) => sum + (product.price * product.qty), 0))
  }, [cart])

  const handleClick = async () => {
    const id = await createOrder({ cart, user: localStorage.getItem('email') })

    if (id) {
      toast.success(`Compra realizada exitosamente. Número de compra: ${id}`)
    } else {
      toast.error('Hubo un error al realizar la compra')
    }
  }

  if (!token) {
    return (
      <section className={styles.prompt}>
        <div className={styles.card}>
          <h2>Debes iniciar sesión para ver tu carrito</h2>
          <p>Por favor, inicia sesión para continuar con tu compra.</p>
          <button onClick={() => navigate('/login')} className={styles.loginBtn}>
            Iniciar sesión
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <p className={styles.title}>Carrito de compras</p>

      <div className={`${styles.grid} ${styles.headerRow}`}>
        <div>Producto</div>
        <div>Precio</div>
        <div>Cantidad</div>
        <div>Sub Total</div>
      </div>

      <div className={styles.rows}>
        {cart.map((it) => (
          <div key={it.id} className={`${styles.grid} ${styles.itemRow}`}>
            <div className={styles.productCell}>
              <img src={it.img_url} alt={it.name} className={styles.thumb} />
              <div>
                <div className={styles.prodName}>{it.name}</div>
              </div>
            </div>

            <div className={styles.priceCell}>{it.price}</div>

            <div className={styles.qtyControls}>
              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(it.id, it.qty - 1)}
                disabled={it.qty <= 1}
                aria-label='Disminuir cantidad'
              >
                –
              </button>

              <span className={styles.qtyValue}>{it.qty}</span>

              <button
                className={styles.qtyBtn}
                onClick={() => updateQty(it.id, it.qty + 1)}
                aria-label='Aumentar cantidad'
              >
                +
              </button>

              <button
                className={styles.removeBtn}
                onClick={() => removeProduct(it.id)}
                aria-label='Eliminar del carrito'
              >
                🗑️
              </button>
            </div>

            <div className={styles.priceCell}>
              {Math.round(it.price * it.qty)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <div className={styles.totalLabel}>Total</div>
        <div className={styles.totalValue}>{Math.round(total)}</div>

        <button
          className={styles.buyBtn}
          onClick={handleClick}
        >
          Comprar
        </button>
      </div>
    </section>
  )
}

export default Cart
