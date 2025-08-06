import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'

import styles from './App.module.css'

function App () {
  return (
    <BrowserRouter>
        <main className={styles.appContainer}>
          <div className={styles.navbarWrapper}>
            <Navbar />
          </div>
          <div className={styles.homeWrapper}>
            <AppRoutes />
          </div>
          <div className={styles.footerWrapper}>
            <Footer />
          </div>
        </main>
    </BrowserRouter>
  )
}

export default App