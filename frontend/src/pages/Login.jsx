import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { UserContext } from '../store/UserContext'
import Swal from 'sweetalert2'

const Login = () => {
  const [users, setUsers] = useState({
    email: '',
    password: ''
  })

  const { auth } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = async (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = users

    if (!email || !password) {
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        icon: 'error'
      })
      return
    }

    if (password.length < 6) {
      Swal.fire({
        title: 'Contraseña debe tener al menos 6 caracteres',
        icon: 'error'
      })
      return
    }

    const result = await auth(email, password, 'login')

    if (result) {
      navigate('/profile')
    }
    // Swal.fire({
    //   title: 'Registro exitoso',
    //   icon: 'success'
    // })

    setUsers({ email: '', password: '' })
  }

  const handleClick = async (e) => {
    navigate('/register')
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src='/src/assets/img/login.jpg'
          alt='Producto'
          className={styles.image}
        />
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Ingresa a tu cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type='email'
              name='email'
              value={users.email}
              onChange={handleChange}
              placeholder='Email'
              className={styles.input}
            />
            <span className={styles.arrow}>→</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type='password'
              name='password'
              value={users.password}
              onChange={handleChange}
              placeholder='Contraseña'
              className={styles.input}
            />
            <span className={styles.arrow}>→</span>
          </div>

          <button type='submit' className={styles.loginButton}>
            Ingresar
          </button>
        </form>

        <div className={styles.newUserSection}>
          <p className={styles.question}>¿Eres nuevo?</p>
          <button className={styles.createButton} onClick={handleClick}>Crear una cuenta</button>
        </div>
      </div>
    </div>
  )
}

export default Login
