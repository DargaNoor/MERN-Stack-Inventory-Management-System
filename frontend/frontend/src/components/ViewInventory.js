import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../src/ViewInventory.css';

const ViewInventory = () => {
    const { name, inStock } = useParams(); // Get parameters from the route
    const [inventoryItem, setInventory] = useState(null);

    useEffect(() => {
        // Fetch inventory details by name and inStock
        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${name}/${inStock}`);
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        fetchInventory();
    }, [name, inStock]);

    if (!inventoryItem) return <div>Loading...</div>;

    // Calculate the discounted price
    const discountedPrice = (inventoryItem.unitPrice * (1 - inventoryItem.discount / 100)).toFixed(2);

    return (
        <div className="main_view">
            <Sidebar />
            <div className="maincontainer">
                <div className="topnav">
                    <div className="textnav">
                        <div className="nav">
                            <div className="textpart">
                                <h1>Inventory</h1>
                            </div>
                            <div className="profile">
                                <div className="nanny">
                                    <img src="/images/nanny.png" alt="Logo" />
                                </div>
                                <div className="notify_profile">
                                    <img src="/images/notify_profile.png" alt="Logo" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="breadcrumbs">
                        <div className="breadcrumbs_content">
                            <div className="home">
                                <img src="/images/home.png" alt="Logo" />
                            </div>
                            <div className="inventory_item">/Inventory</div>
                            <div className="inventory_item1">/View</div>
                        </div>
                    </div>
                </div>
                <div className="inventory-view-container">
                    <div className="inventory-card">
                        <img
                            src={`http://localhost:5000/uploads/${inventoryItem.imagePath}`}
                            alt={inventoryItem.name}
                            className="inventory-image"
                        />
                        <div className="inventory-details">
                            <h2>{inventoryItem.name}</h2>
                            <p><strong>Category:</strong> {inventoryItem.category}</p>
                            <p><strong>In Stock:</strong> {inventoryItem.inStock}</p>
                            <p><strong>Unit Price:</strong> ${inventoryItem.unitPrice}</p>
                            <p><strong>Discount:</strong> {inventoryItem.discount}%</p>
                            <p><strong>Price After Discount:</strong> ${discountedPrice}</p>
                            <p><strong>Order Type:</strong> {inventoryItem.orderType}</p>
                            <p><strong>Description:</strong> {inventoryItem.description}</p>
                            <p><strong>Date Added:</strong> {new Date(inventoryItem.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInventory;
