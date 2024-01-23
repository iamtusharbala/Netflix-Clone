import './App.css'
import BackgroundDrop from './components/BackgroundDrop/BackgroundDrop'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Navbar />
                <Outlet />
              </>
            }
          >
            <Route path='/' element={<BackgroundDrop />} />
            {/* Add more nested routes as needed */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
