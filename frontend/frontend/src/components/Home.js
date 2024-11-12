// frontend/src/components/Home.js
import React from 'react';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import ProductStatus from './productStatus';
import LowStockProducts from './lowStockProducts';
import ExpiryProducts from './expiryProducts';


const Table = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();

        // Map through the products and set initial status based on action
        const updatedProducts = data.map((product) => ({
          ...product,
          status: product.action === 'publish' ? 'Available' : 'Unavailable',
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle action change and update status accordingly
  const handleActionChange = (index, newAction) => {
    setProducts((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index
          ? {
            ...product,
            action: newAction,
            status: newAction === 'publish' ? 'Available' : 'Unavailable',
          }
          : product
      )
    );
  };

  console.log(products[0])

  return (
    <div className="table-container">
      <div className="table-header">
        <div><input type="checkbox" /></div>
        <div>Product Name</div>
        <div>Category</div>
        <div>Unit Price</div>
        <div>In-Stock</div>
        <div>Discount</div>
        <div>Total Value</div>
        <div>Action</div>
        <div>Status</div>
      </div>
      {products.map((product, index) => (
        <div className="table-row" key={index}>
          <div><input type="checkbox" /></div>
          <div>{product.name}</div>
          <div>{product.category}</div>
          <div>₹{product.unitPrice}</div>
          <div>{product.inStock > 0 ? product.inStock : 'Out of Stock'}</div>
          <div>₹{product.discount}</div>
          <div>₹{(product.unitPrice * (1 - product.discount / 100)).toFixed(2)}</div>
          <div>
            <select value={product.action} onChange={(e) => handleActionChange(index, e.target.value)}  >
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
          </div>
          <div>{product.status}</div>
        </div>
      ))}
    </div>
  );
};

function OneStarRating() {
  return (
    <div className="onestarRating">
      <p>1 Star Rating</p>
      <span>2</span>
    </div>
  );
}

const Home = () => {
  return (
    <div class="whole">
      <Sidebar />
      <div class="maincontainer">
        <div class="topnav">
          <div class="textnav">
            <div class="nav">
              <div class="textpart">
                <h1>Inventory</h1>
              </div>
              <div class="profile">
                <div class="nanny">
                  <img src="/images/nanny.png" alt="Logo" />
                </div>
                <div class="notify_profile">
                  <img src="/images/notify_profile.png" alt="Logo" />
                </div>
              </div>
            </div>

          </div>
          <div class="breadcrumbs">
            <div class="breadcrumbs_content">
              <div class="home">
                <img src="/images/home.png" alt="Logo" />
              </div>
              <div class="inventory_item">
                /Inventory
              </div>
              <div class="inventory_item1">

              </div>
              <div class="inventory_item2">

              </div>
              <div class="inventory_item3">

              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div className="main-content">
            <div class="heading">
              <h1>Inventory Summary</h1>
              <button class="buttons" onClick={() => (window.location.href = '/inventory/new_inventory')}>Add New Product  </button>
            </div>

            <div class="summaryrow">
              <div class="dashboard_left">
                <div class="summarycontainer">
                  <img src="/images/summary_folder.png" alt="Logo" />
                </div>
                <div class="summary_card">
                  <ProductStatus />
                </div>
              </div>
              <div class="dashboard_right">
                <div class="summarycontainer">
                  <img src="/images/active3.png" alt="Logo" />
                </div>
                <div class="summary_card_right">
                  <div class="low_stock">
                    <LowStockProducts />
                  </div>
                  <div class="expired">
                    <ExpiryProducts />
                  </div>
                  <div class="onestarRating">
                    <OneStarRating />
                  </div>
                </div>
              </div>
            </div>
            <div class="continer_table">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
