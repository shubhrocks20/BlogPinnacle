import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import User from './components/User.jsx'
import Blogs from './components/Blogs.jsx'
import MyBlogs from './components/MyBlogs.jsx'
import EditBlog from './components/EditBlog.jsx'
import SingleBlogPage from './components/SingleBlogPage.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    
    
    <Route path='/' element={<App />}>
      {/* <Route path='/' element></Route> */}
      <Route path='' element={<Home />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='user' element={<User />}></Route>
      <Route path='blogs' element={<Blogs />}></Route>
      <Route path='myblogs' element={<MyBlogs />}></Route>
      <Route path='edit' element={<EditBlog />}></Route>
      <Route path='singleblog' element={<SingleBlogPage />}></Route>
    </Route>
    
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <PersistGate persistor={persistor}>

    <RouterProvider router={router} />
     </PersistGate>
  </Provider>
)
