import React, { useContext, useEffect } from 'react'
import styles from './Profile.module.css'
import { UserContext } from '../store/UserContext.jsx'
import { CartContext } from '../store/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { fetchProfile, profile, logout } = useContext(UserContext)
  const { deleteCart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    deleteCart()
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (!profile) return <p>Cargando perfil...</p>

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <img
            src={profile.img_url || '/src/assets/img/default-avatar.jpg'}
            alt='Foto de perfil'
            className={styles.avatarImage}
          />
        </div>
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>Mi Perfil</h2>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Nombre</span>
          <span className={styles.value}>{profile.name}</span>
        </div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Apellidos</span>
          <span className={styles.value}>{profile.last_name}</span>
        </div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{profile.email}</span>
        </div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Dirección</span>
          <span className={styles.value}>{profile.address}</span>
        </div>

        <div className={styles.infoGroup}>
          <span className={styles.label}>Número de contacto</span>
          <span className={styles.value}>{profile.phone_number}</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>Cerrar Sesión</button>

        {profile.rol === 'admin' && (<button onClick={() => navigate('/products/new')} className={styles.logoutButton}>Agregar producto</button>)}
      </div>
    </div>
  )
}

export default Profile
