import styles from './Home.module.css'
import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { ProductContext } from '../store/ProductContext.jsx'

const Home = () => {
  const { products, fetchProducts } = useContext(ProductContext)

  useEffect(() => {
    fetchProducts()
  }, [])

  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  if (!products) return (<p>Cargando Inicio</p>)
  return (
    <main className={styles.homeWrapper}>
      <section className={styles.hero}>
        <div className={styles.herocontent}>
          <p>Estilo Natural y Minimalista</p>
          <p>Descubre una rutina de cuidado facial creada para realzar tu belleza natural. Combinamos ingredientes de alta calidad con ciencia efectiva para que tu piel se vea y se sienta saludable todos los días.</p>
        </div>
      </section>

      <section className={styles.products}>
        <p className={styles.productsTitle}>Productos destacados</p>
        <div className={styles.productGrid}>
          {products.map((prod) => (
            <ProductCard
              key={prod.id}
              title={prod.name}
              desc={prod.description}
              price={`$${prod.price}`}
              img={prod.image_url}
            />
          ))}
        </div>
        <a href='/products' className={styles.productsLink}>Todos los productos →</a>
      </section>

      <section className={styles.discoverContainer}>
        <div className={styles.fullWidthImage}>
          <img src='/src/assets/img/discover-model.jpg' alt='model' className={styles.bannerImg} />
        </div>
        <div id='discover' className={styles.discoverForm}>
          <div className={styles.imgContainer}>
            <img src='/src/assets/img/discover-form.jpg' alt='skincare' className={styles.img} />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>Inscríbete a nuestro newsletter</p>
            <p className={styles.text}>
              ¡Inscríbete para conocer nuevos productos, descuentos y más!
            </p>
            <div className={styles.formRow}>
              <input
                type='email'
                placeholder='Tu Email'
                className={styles.input}
              />
              <button className={styles.button}>Enviar</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
