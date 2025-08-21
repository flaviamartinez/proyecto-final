import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { UserContext } from '../store/UserContext'

const Login = () => {
  const [users, setUsers] = useState({
    email: '',
    password: ''
  })

  const [errorMsg, setErrorMsg] = useState('')

  const { auth } = useContext(UserContext)

  const navigate = useNavigate()

  const handleChange = async (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = users

    setErrorMsg('')

    if (!email || !password) {
      setErrorMsg('Todos los campos son obligatorios')
      return
    }

    const result = await auth(email, password, 'login')

    if (result) {
      navigate('/profile')
    }

    setUsers({ email: '', password: '' })
  }

  const handleClick = async (e) => {
    navigate('/register')
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src='/img/login.png'
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

          {errorMsg && (
            <p className={styles.errorMessage}>{errorMsg}</p>
          )}
        </form>

        <div className={styles.newUserSection}>
          <p className={styles.question}>¿Eres nuevo?</p>
          <button className={styles.registerButton} onClick={handleClick}>
            Crear una cuenta
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
