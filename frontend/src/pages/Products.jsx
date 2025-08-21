import { useEffect, useContext, useState, useMemo } from 'react'
import styles from './Product.module.css'
import { ProductContext } from '../store/ProductContext.jsx'
import { UserContext } from '../store/UserContext.jsx'
import ProductCard from '../components/ProductCard'
import { formatCLP } from '../utils/formatCLP.js'

const Products = () => {
  const { products, getProducts } = useContext(ProductContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [order, setOrder] = useState('none')
  const { wishlist, fetchProfile } = useContext(UserContext)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))),
    [products]
  )

  const filteredProducts = useMemo(() => {
    let updated = [...products]

    if (selectedCategory !== 'all') {
      updated = updated.filter(p => p.category === selectedCategory)
    }

    if (order === 'asc') {
      updated.sort((a, b) => a.price - b.price)
    } else if (order === 'desc') {
      updated.sort((a, b) => b.price - a.price)
    }

    return updated
  }, [products, selectedCategory, order])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pageItems = filteredProducts.slice(start, end)

  useEffect(() => {
    getProducts()
    fetchProfile()
    console.log(wishlist)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [selectedCategory, order, pageSize])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  const goTo = (n) => setPage(n)
  const prev = () => setPage(p => Math.max(1, p - 1))
  const next = () => setPage(p => Math.min(totalPages, p + 1))

  if (!wishlist) return (<p> Cargando...</p>)
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value='all'>Todas las categorías</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value='none'>Sin ordenar</option>
          <option value='asc'>Precio: menor a mayor</option>
          <option value='desc'>Precio: mayor a menor</option>
        </select>

        <select
          className={styles.select}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          aria-label='Productos por página'
        >
          <option value={8}>8 por página</option>
          <option value={12}>12 por página</option>
          <option value={16}>16 por página</option>
        </select>
      </div>

      <div className={styles.grid}>
        {pageItems.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.name}
            desc={prod.description}
            price={formatCLP(prod.price)}
            img={prod.img_url}
            isinWishlist={wishlist ? wishlist.some(w => w.product_id === prod.id) : false}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={styles.pageBtn}
          onClick={prev}
          disabled={page === 1}
          aria-label='Página anterior'
        >
          ‹
        </button>

        <div className={styles.pageList}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => goTo(n)}
              className={`${styles.pageNumber} ${n === page ? styles.pageActive : ''}`}
              aria-current={n === page ? 'page' : undefined}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          className={styles.pageBtn}
          onClick={next}
          disabled={page === totalPages}
          aria-label='Página siguiente'
        >
          ›
        </button>

        <span className={styles.pageInfo}>
          Página {page} de {totalPages} — {filteredProducts.length} productos
        </span>
      </div>
    </div>
  )
}

export default Products
