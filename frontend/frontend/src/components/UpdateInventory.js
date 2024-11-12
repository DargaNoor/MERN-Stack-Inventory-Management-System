import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../../src/ViewInventory.css';

const UpdateProductForm = () => {
    const [name, setName] = useState('');
    const [inStock, setInStock] = useState('');
    const [field, setField] = useState('');
    const [newValue, setNewValue] = useState('');

    // List of fields in the product schema to update
    const fields = [
        { label: "Category", value: "category" },
        { label: "Discount", value: "discount" },
        { label: "Order Type", value: "orderType" },
        { label: "Status", value: "status" },
        { label: "Name", value: "name" },
        { label: "Unit Price", value: "unitPrice" },
        { label: "Action", value: "action" },
        { label: "Total Orders", value: "totalOrders" },
        { label: "Description", value: "description" },
        { label: "Expiry Date", value: "expiryDate" },
        { label: "In Stock", value: "inStock" },

        // Add other fields as per your schema
    ];

    const handleUpdate = async (event) => {
        event.preventDefault();

        // Confirmation dialog before updating
        const isConfirmed = window.confirm("Are you sure you want to update this product?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await axios.patch('http://localhost:5000/api/products/update', {
                name,
                inStock: Number(inStock),
                field,
                newValue,
            });
            console.log("Response ", response)
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating product');
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
                    <h2>Update Product</h2>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>In Stock:</label>
                            <input
                                type="number"
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Field to Update:</label>
                            <select
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                                required
                            >
                                <option value="">Select a field</option>
                                {fields.map((f) => (
                                    <option key={f.value} value={f.value}>
                                        {f.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>New Value:</label>
                            <input
                                type="text"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductForm;
