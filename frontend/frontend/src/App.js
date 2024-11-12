// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewInventory from './components/NewInventory';
import ViewInventory from './components/ViewInventory';
import DeleteProductForm from './components/DeleteInventory';
import UpdateProductForm from './components/UpdateInventory';

const App = () => (
  <Router>
    <Routes>
      <Route path="/inventory" element={<Home />} />
      <Route path="/inventory/new_inventory" element={<NewInventory />} />
      <Route path="/inventory/view_inventory/:name/:inStock" element={<ViewInventory />} />
      <Route path="/inventory/products/delete" element={<DeleteProductForm />} />
      <Route path="/inventory/products/update" element={<UpdateProductForm />} />
    </Routes>
  </Router>
);

export default App;
