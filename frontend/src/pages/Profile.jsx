import React, { useContext, useEffect } from 'react'
import styles from './Profile.module.css'
import { UserContext } from '../store/UserContext.jsx'

const Profile = () => {
  const { fetchProfile, profile, logout } = useContext(UserContext)

  useEffect(() => {
    fetchProfile()
  }, [])

  if (!profile) return <p>Cargando perfil...</p>

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <img
            src={profile.url_img || '/src/assets/img/default-avatar.jpg'}
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
          <span className={styles.value}>{profile.apellido}</span>
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
        <button onClick={logout} className={styles.logoutButton}>Cerrar Sesión</button>
      </div>
    </div>
  )
}

export default Profile
