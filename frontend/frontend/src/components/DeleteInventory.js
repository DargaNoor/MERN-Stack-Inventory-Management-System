import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../../src/ViewInventory.css';


const DeleteProductForm = () => {
    console.log("hi to delete")
    const [name, setName] = useState('');
    const [inStock, setInStock] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    console.log("Wait deleting")
    const handleDelete = async (event) => {
        event.preventDefault();

    // Display confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) {
      return; // If not confirmed, do nothing
    }
        try {
            const response = await axios.delete('http://localhost:5000/api/products/delete', {
                data: { name, inStock }
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage(error.response?.data?.message || 'Error deleting product');
        }
    };

    return (
        <div class="main_view">
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
                                /Delete
                            </div>
                            <div class="inventory_item2">

                            </div>
                            <div class="inventory_item3">

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Delete Product</h2>
                    <form onSubmit={handleDelete}>
                        <label>
                            Product Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            In Stock:
                            <input
                                type="number"
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Delete Product</button>
                    </form>
                    {responseMessage && <p>{responseMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default DeleteProductForm;
