import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider, useSelector } from 'react-redux'
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'

import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate} from 'react-router-dom'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import User from './components/User.jsx'
import Blogs from './components/Blogs.jsx'
import MyBlogs from './components/MyBlogs.jsx'
import EditBlog from './components/EditBlog.jsx'
import SingleBlogPage from './components/SingleBlogPage.jsx'

const UserWrapper = () => {
  const { user } = useSelector((state) => state.reducer.login);
  return user ? <User /> : <Navigate to="/login" />;
};

const MyBlogsWrapper = () => {
  const { user } = useSelector((state) => state.reducer.login);
  return user ? <MyBlogs /> : <Navigate to="/login" />;
};

const EditBlogWrapper = () => {
  const { user } = useSelector((state) => state.reducer.login);
  return user ? <EditBlog /> : <Navigate to="/login" />;
};

const SingleBlogPageWrapper = () => {
  const { user } = useSelector((state) => state.reducer.login);
  return user ? <SingleBlogPage /> : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />}></Route>
      <Route path='register' element={<Register />}></Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='user' element={<UserWrapper />}></Route>
      <Route path='blogs' element={<Blogs /> }></Route>
      <Route path='myblogs' element={<MyBlogsWrapper />}></Route>
      <Route path='edit' element={<EditBlogWrapper />}></Route>
      <Route path='singleblog' element={<SingleBlogPageWrapper />}></Route>
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
