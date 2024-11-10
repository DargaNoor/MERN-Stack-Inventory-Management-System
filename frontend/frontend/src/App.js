// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewInventory from './components/NewInventory';
import ViewInventory from './components/ViewInventory';

const App = () => (
  <Router>
    <Routes>
      <Route path="/inventory" element={<Home />} />
      <Route path="/inventory/new_inventory" element={<NewInventory />} />
      <Route path="/inventory/view_inventory/:name/:inStock" element={<ViewInventory />} />
      {/* <Route path="/products/:id" component={<ViewInventory/>} /> */}
    </Routes>
  </Router>
);

export default App;
