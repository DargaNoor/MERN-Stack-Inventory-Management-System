import React from 'react';
import { useEffect, useState } from 'react';

function ExpiryProducts() {
    const [expiryProducts, setExpiryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products with expired or close-to-expiry dates from the server
        async function fetchExpiryProducts() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products/expiry');

                if (!response.ok) {
                    throw new Error('Failed to fetch expiry products');
                }

                const data = await response.json();
                setExpiryProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpiryProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <div className="expired">
            <p>Expiry Products</p>
            <span>{expiryProducts.length}</span>
        </div>
    );
}

export default ExpiryProducts;