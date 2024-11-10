import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../src/ViewInventory.css';


const ViewInventory = () => {
    const { name, inStock } = useParams(); // Get ID from route parameter
    // const id = "672e38b25a5dff3ac5262efc";
    // var name;
    // var inStock;
    const [inventoryItem, setInventory] = useState(null);

    useEffect(() => {
        // Fetch inventory details by ID
        const fetchInventory = async () => {
            try {
                // const response = await fetch(`http://localhost:5000/products/${id}`);
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
                                /View
                            </div>
                            <div class="inventory_item2">

                            </div>
                            <div class="inventory_item3">

                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventory-view-container">
                    <div className="inventory-card">

                        {/* <img src={`http://localhost:5000/uploads/${inventoryItem.image}`} alt={inventoryItem.name} className="inventory-image" /> */}
                        {/* <img src={`http://localhost:5000/uploads/1731072608912.jpeg`} alt={inventoryItem.name} className="inventory-image" /> */}
                        {/* <img src={`http://localhost:5000/uploads/${inventoryItem.image}`} alt={inventoryItem.name} className="inventory-image" /> */}
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
                            <p><strong>Order Type:</strong> {inventoryItem.orderType}</p>
                            <p><strong>Description:</strong> {inventoryItem.description}</p>
                            <p><strong>Date Added:</strong> {new Date(inventoryItem.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* <div className="inventory-view-container">
                    <div className="inventory-card">
                        <img
                            src={`http://localhost:5000/uploads/${inventoryItem.imagePath}`}
                            alt={inventoryItem.name}
                            className="inventory-image"
                        />
                        <div className="inventory-details">
                            <h2>{inventoryItem.name}</h2>
                            <p className="field"><strong>Category:</strong> {inventoryItem.category}</p>
                            <p className="field"><strong>In Stock:</strong> {inventoryItem.inStock}</p>
                            <p className="field"><strong>Unit Price:</strong> ${inventoryItem.unitPrice}</p>
                            <p className="field"><strong>Discount:</strong> {inventoryItem.discount}%</p>
                            <p className="field"><strong>Order Type:</strong> {inventoryItem.orderType}</p>
                            <p className="field description"><strong>Description:</strong> {inventoryItem.description}</p>
                            <p className="field"><strong>Date Added:</strong> {new Date(inventoryItem.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div> */}

            </div>


        </div>
    );
};

// return (
//     <div className="main_view">
//         <Sidebar />
//         <div className="maincontainer">
//             <div className="topnav">
//                 <h1>Inventory</h1>
//                 <div className="breadcrumbs">
//                     <span>Home / Inventory / View</span>
//                 </div>
//             </div>
//             <div className="inventory-view-container">
//                 <div className="inventory-card">
//                     <img
//                         src={`http://localhost:5000/uploads/${inventoryItem.imagePath}`}
//                         alt={inventoryItem.name}
//                         className="inventory-image"
//                     />
//                     <div className="inventory-details">
//                         <h2>{inventoryItem.name}</h2>
//                         <p className="field"><strong>Category:</strong> {inventoryItem.category}</p>
//                         <p className="field"><strong>In Stock:</strong> {inventoryItem.inStock}</p>
//                         <p className="field"><strong>Unit Price:</strong> ${inventoryItem.unitPrice}</p>
//                         <p className="field"><strong>Discount:</strong> {inventoryItem.discount}%</p>
//                         <p className="field"><strong>Order Type:</strong> {inventoryItem.orderType}</p>
//                         <p className="field description"><strong>Description:</strong> {inventoryItem.description}</p>
//                         <p className="field"><strong>Date Added:</strong> {new Date(inventoryItem.date).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// };



export default ViewInventory;