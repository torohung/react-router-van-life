
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { Vans, loader as vansLoader } from './pages/Van/Vans.jsx'
import { VanDetail } from './pages/Van/VanDetail.jsx'
import { Layout } from './components/Layout.jsx'
import { Dashboard } from './pages/Host/Dashboard.jsx'
import { Income } from './pages/Host/Income.jsx'
import { Reviews } from './pages/Host/Reviews.jsx'
import { HostLayout } from './components/HostLayout.jsx'
import { HostVans } from './pages/Host/HostVans.jsx'
import { HostVanDetail } from './pages/Host/HostVanDetail.jsx'
import { HostVanPhotos } from './pages/Host/HostVanPhotos.jsx'
import { HostVanPricing } from './pages/Host/HostVanPricing.jsx'
import { HostVanInfo } from './pages/Host/HostVanInfo.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Error } from './components/Error.jsx'

function App() {

  const router = createBrowserRouter(createRoutesFromElements( //new data-layer API features
    <Route path='/' element={<Layout />} >
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route 
      path='vans' 
      element={<Vans />} 
      loader={vansLoader}
      errorElement={<Error/>}
      />
      <Route path='vans/:id' element={<VanDetail />} />
      <Route path='host' element={<HostLayout />} >
        <Route index element={<Dashboard />} />
        <Route path='income' element={<Income />} />
        <Route path='reviews' element={<Reviews />} />
        <Route path='vans' element={<HostVans />} />
        <Route path='vans/:id' element={<HostVanDetail />} >
          <Route index element={<HostVanInfo />} />
          <Route path='hostvanpricing' element={<HostVanPricing />} />
          <Route path='hostvanphotos' element={<HostVanPhotos />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
