import { useEffect, useContext, useState } from 'react'
import styles from './Product.module.css'
import { ProductContext } from '../store/ProductContext.jsx'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const { products, getProducts } = useContext(ProductContext)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [order, setOrder] = useState('none')
  const categories = Array.from(new Set(products.map(p => p.category)))

  useEffect(() => {
    let updated = [...products]

    if (selectedCategory !== 'all') {
      updated = updated.filter(p => p.category === selectedCategory)
    }

    if (order === 'asc') {
      updated = updated.sort((a, b) => a.price - b.price)
    } else if (order === 'desc') {
      updated = updated.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(updated)
  }, [products, selectedCategory, order])

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <select
          className={styles.select}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value='all'>Todas las categorías</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className={styles.select}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value='none'>Sin ordenar</option>
          <option value='asc'>Precio: menor a mayor</option>
          <option value='desc'>Precio: mayor a menor</option>
        </select>
      </div>
      <div className={styles.grid}>
        {filteredProducts.map(prod => (
          <ProductCard
            key={prod.id}
            id={prod.id}
            title={prod.name}
            desc={prod.description}
            price={`$${prod.price}`}
            img={prod.img_url}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
