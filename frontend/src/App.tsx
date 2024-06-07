import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layouts from "./layouts/Layouts";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portfolio from "./pages/Portfolio";
import Trading from "./pages/Trading";
import { Provider } from 'mobx-react';
import favoritesStore from './stores/FavoritesStore';

const BrowserRouter = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  },
]);



function App() {
  React.useEffect(() => {
    console.log('App');
    
  }, []);
  return (
   <RouterProvider router={BrowserRouter} />
  )
}


function Root() {
  return (
    <Provider favoritesStore={favoritesStore}>
    <Routes>
      <Route path="/" element={<Layouts><Home /></Layouts> } />
      <Route path="/login" element={<Layouts><Login /></Layouts>} />
      <Route path="/register" element={<Layouts><Register /></Layouts>} />
      <Route path="/about" element={<Layouts><About /></Layouts>} />
      <Route path="/profile" element={<Layouts><Portfolio /></Layouts>} />
      <Route path="/trading" element={<Layouts><Trading /></Layouts>} />
    </Routes>
    </Provider>
  )
}

export default App