import React from 'react';
import './ProductSkeleton.css';

export const ProductSkeleton = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line text"></div>
        </div>
    );
};