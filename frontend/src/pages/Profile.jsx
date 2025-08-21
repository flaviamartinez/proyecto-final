import React, { useContext, useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { UserContext } from '../store/UserContext.jsx'
import { CartContext } from '../store/CartContext.jsx'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { fetchProfile, profile, logout, wishlist, deleteFromWishlist } = useContext(UserContext)
  const { deleteCart } = useContext(CartContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('datos')

  const handleLogout = () => {
    logout()
    deleteCart()
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const isLoading = !wishlist
  const hasItems = wishlist && wishlist.length > 0

  if (!profile) return <p>Cargando perfil...</p>

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.avatar}>
          <img
            src={profile.img_url || '/src/assets/img/default-avatar.png'}
            alt='Foto de perfil'
            className={styles.avatarImage}
          />
        </div>
      </div>

      <div className={styles.right}>
        <h2 className={styles.title}>Mi Perfil</h2>

        {/* Tabs */}
        <div role='tablist' aria-label='Secciones del perfil' className={styles.tabs}>
          <button
            role='tab'
            aria-selected={activeTab === 'datos'}
            className={`${styles.tab} ${activeTab === 'datos' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('datos')}
          >
            Datos
          </button>
          <button
            role='tab'
            aria-selected={activeTab === 'wishlist'}
            className={`${styles.tab} ${activeTab === 'wishlist' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            Wishlist
          </button>
        </div>

        {activeTab === 'datos' && (
          <div role='tabpanel' className={styles.panel}>
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

            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar Sesión
            </button>
            {profile.rol === 'admin' && (
              <button onClick={() => navigate('/products/new')} className={styles.logoutButton}>
                Agregar producto
              </button>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div role='tabpanel' className={styles.panel}>
            {isLoading
              ? (
                <p>Cargando wishlist...</p>
                )
              : hasItems
                ? (
                  <ul className={styles.wishlistGrid}>
                    {wishlist.map((item) => (
                      <li key={item.product_id} className={styles.wishlistCard}>
                        <img src={item.img_url} alt={item.name} />
                        <div className={styles.wishlistBody}>
                          <p className={styles.wItemTitle}>{item.name}</p>
                          <div className={styles.wActions}>
                            <button
                              className={styles.wGhost}
                              onClick={() => navigate(`/products/${item.product_id}`)}
                            >
                              Ver detalle
                            </button>
                            <button
                              className={styles.wRemove}
                              onClick={() => deleteFromWishlist(item.product_id, profile.id)}
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  )
                : (
                  <p className={styles.empty}>Tu wishlist está vacía.</p>
                  )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile
