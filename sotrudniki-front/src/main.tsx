import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Paths } from './paths.ts'
import Login from './pages/Login/index.tsx'
import Register from './pages/Register/index.tsx'
import { ConfigProvider, theme } from 'antd'
import Auth from './features/auth/auth.tsx'
import Employees from './pages/Employees/index.tsx'
import AddEmployee from './pages/AddEmployee/index.tsx'
import Status from './pages/status/index.tsx'
import Employee from './pages/Employee/index.tsx'
import EditEmployee from './pages/EditEmployee/index.tsx'

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        algorithm: theme.darkAlgorithm
      }}>
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
