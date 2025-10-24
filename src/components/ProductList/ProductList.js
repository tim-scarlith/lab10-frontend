import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductSkeleton } from '../Loading/ProductSkeleton';
import { ErrorMessage } from '../Loading/ErrorMessage';
import './ProductList.css';

export const ProductList = ({ products, loading, error, onProductClick, onRetry }) => {
    if (loading) {
        return (
            <div className="product-list-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (error) {
        return <ErrorMessage message={error} onRetry={onRetry} />;
    }
    if (products.length === 0) {
        return (
            <div className="product-list-empty">
                <p>No hay productos para mostrar.</p>
            </div>
        );
    }
    return (
        <div className="product-list-grid">
            {products.map(product => (
                <ProductCard 
                    key={product.id || product.sku} 
                    product={product} 
                    onClick={() => onProductClick(product.id)}
                />
            ))}
        </div>
    );
};