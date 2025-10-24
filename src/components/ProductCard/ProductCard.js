import React from 'react';
import './ProductCard.css';

export const ProductCard = ({ product, onClick }) => {
    return (
        <div className="product-card" onClick={onClick} tabIndex={0} role="button">
            <div className="product-card-content">
                <h3 className="product-card-name">{product.name || 'Nombre no disponible'}</h3>
                <p className="product-card-sku">SKU: {product.sku || 'N/A'}</p>
            </div>
        </div>
    );
};