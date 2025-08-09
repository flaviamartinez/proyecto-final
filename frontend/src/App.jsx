import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import AppProviders from './store/AppProviders.jsx'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import { Toaster } from 'sonner'

import styles from './App.module.css'

function App () {
  return (
    <BrowserRouter>
      <AppProviders>
        <main className={styles.appContainer}>
          <div className={styles.navbarWrapper}>
            <Navbar />
          </div>
          <div className={styles.homeWrapper}>
            <AppRoutes />
          </div>
          <div>
            <Footer />
          </div>
        </main>
        <Toaster richColors position='bottom-right' />
      </AppProviders>
    </BrowserRouter>
  )
}

export default App
