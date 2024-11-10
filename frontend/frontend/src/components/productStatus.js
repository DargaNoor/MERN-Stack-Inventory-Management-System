import React from 'react';
import { useEffect, useState } from 'react';

function ProductStatus() {
    const [productCount, setProductCount] = useState({ active: 0, inactive: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product count from the server
        async function fetchProductCount() {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/products/count');

                if (!response.ok) {
                    throw new Error('Failed to fetch product count');
                }

                const data = await response.json();
                setProductCount(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProductCount();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="fetchProducts">
            <div>
                <p>Total Products</p>
                <p><span>{productCount.active + productCount.inactive}</span></p>
            </div>
            <div>
                <p>Active</p>
                <p><span>{productCount.active}</span></p>
            </div>
        </div>
    );
}

export default ProductStatus;
