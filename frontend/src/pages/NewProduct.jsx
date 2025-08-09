import React, { useState, useContext } from 'react'
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

  const { createProduct } = useContext(ProductContext)

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')
    console.log('Borrando mensaje')
    if (!form.name || !form.description || !form.price || !form.stock || !form.category || !form.img_url) {
      setErrorMessage('Todos los campos son obligatorios')
      return
    }

    const res = await createProduct(form)

    if (res) {
      toast.success(res)
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
          <input type='text' name='category' placeholder='Categoría' onChange={handleChange} value={form.category} className={styles.input} />
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
