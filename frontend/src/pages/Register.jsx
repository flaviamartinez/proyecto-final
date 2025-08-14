import React, { useState, useContext } from 'react'
import styles from './Register.module.css'
import { UserContext } from '../store/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    last_name: '',
    email: '',
    address: '',
    phone_number: '',
    password: '',
    img_url: ''
  })

  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const { register } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMessage('')

    if (!form.name || !form.last_name || !form.email || !form.address || !form.phone_number || !form.password || !form.img_url) {
      setErrorMessage('Todos los campos son obligatorio')
      return
    }

    const result = await register(form)

    if (result) {
      navigate('/profile')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src='/src/assets/img/register.jpg'
          alt='Hands'
          className={styles.image}
        />
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Registrate</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input type='text' name='name' placeholder='Nombre' onChange={handleChange} value={form.name} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='text' name='last_name' placeholder='Apellidos' onChange={handleChange} value={form.last_name} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='email' name='email' placeholder='Email' onChange={handleChange} value={form.email} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='text' name='address' placeholder='Dirección' onChange={handleChange} value={form.address} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='tel' name='phone_number' placeholder='Número de contacto' onChange={handleChange} value={form.phone_number} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='url' name='img_url' placeholder='Foto de perfil (URL)' onChange={handleChange} value={form.img_url} className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <input type='password' name='password' placeholder='Contraseña' onChange={handleChange} value={form.password} className={styles.input} />
          </div>

          <button type='submit' className={styles.submitButton}>Crear Cuenta</button>

          {errorMessage && (<p className={styles.errorMessage}>{errorMessage}</p>)}
        </form>
      </div>
    </div>
  )
}

export default Register
