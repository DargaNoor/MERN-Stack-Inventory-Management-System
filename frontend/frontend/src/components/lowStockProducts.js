import React from 'react';
import { useEffect, useState } from 'react';


function LowStockProducts() {
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch low-stock products from the server
        async function fetchLowStockProducts() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products/low-stock');

                if (!response.ok) {
                    throw new Error('Failed to fetch low stock products');
                }

                const data = await response.json();
                setLowStockProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLowStockProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="low_stock">
            <p>Low Stock Products</p>
            <span>{lowStockProducts.length}</span>
        </div>
    );
}


export default LowStockProducts;