import React, { useState, useContext } from 'react'
import styles from './Register.module.css'
import { UserContext } from '../store/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    telefono: '',
    password: ''
  })

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const { register } = useContext(UserContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        <h2 className={styles.title}>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input type='text' name='nombre' placeholder='Nombre' onChange={handleChange} value={form.nombre} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input type='text' name='apellidos' placeholder='Apellidos' onChange={handleChange} value={form.apellidos} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input type='email' name='email' placeholder='Email' onChange={handleChange} value={form.email} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input type='text' name='direccion' placeholder='Dirección' onChange={handleChange} value={form.direccion} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input type='text' name='telefono' placeholder='Número de contacto' onChange={handleChange} value={form.telefono} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input type='password' name='password' placeholder='Contraseña' onChange={handleChange} value={form.password} className={styles.input} />
            <span className={styles.arrow}>→</span>
          </div>

          <button type='submit' className={styles.submitButton}>Crear Cuenta</button>
        </form>
      </div>
    </div>
  )
}

export default Register
