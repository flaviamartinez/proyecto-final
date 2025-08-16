import React, { useState, useContext, useEffect } from 'react'
import styles from './NewProduct.module.css'
import { ProductContext } from '../store/ProductContext'
import { toast } from 'sonner'

const NewProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    img_url: ''
  })

  const { createProduct, categories, fetchCategories } = useContext(ProductContext)

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')

    if (!form.name || !form.description || !form.price || !form.stock || !form.category || !form.img_url) {
      setErrorMessage('Todos los campos son obligatorios')
      return
    }

    const { id, message } = await createProduct(form)

    if (id) {
      toast.success(`${message}. ID Producto: ${id}`)
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        img_url: ''
      })
    } else {
      toast.error('Hubo un error al crear el producto')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (!categories) return (<p>Cargando...</p>)

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Crear producto</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input type='text' name='name' placeholder='Nombre' onChange={handleChange} value={form.name} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <input type='text' name='description' placeholder='Descripcion' onChange={handleChange} value={form.description} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <input type='number' name='price' placeholder='Precio' onChange={handleChange} value={form.price} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <input type='number' name='stock' placeholder='Stock' onChange={handleChange} value={form.stock} className={styles.input} />
        </div>

        <div className={styles.inputGroup}>
          <select
            name='category'
            onChange={handleChange}
            value={form.category}
            className={styles.input}
          >
            <option value=''>Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputGroup}>
          <input type='url' name='img_url' placeholder='Foto del producto (URL)' onChange={handleChange} value={form.img_url} className={styles.input} />
        </div>

        <button type='submit' className={styles.submitButton}>Crear Producto</button>

        {errorMessage && (<p className={styles.errorMessage}>{errorMessage}</p>)}
      </form>
    </div>
  )
}

export default NewProduct
