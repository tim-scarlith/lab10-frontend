import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../services/apiService';

/**
 * Hook para gestionar formato xml o json y la lista de productos
 * @param {string} format 
 * @param {number} pageSize 
 * @param {string} sortBy 
 */
export const useProducts = (format, pageSize, sortBy) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, currentPage: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize, format]);
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await getProducts(currentPage, pageSize, format); 
                
                if (data && data.products) {
                    setProducts(data.products);
                    setPagination(data.pagination);
                } else {
                    setProducts([]);
                    setPagination({ totalPages: 1, currentPage: 1 });
                }
            } catch (err) {
                setError(err.message); 
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, pageSize, format]);
    const sortedProducts = useMemo(() => {
        const [field, direction] = sortBy.split(':');
        
        if (!field) return products;

        const sorted = [...products].sort((a, b) => {
            let valA = a[field];
            let valB = b[field];
            if (typeof valA === 'number') {
                return valA - valB;
            }
            return (valA || '').toString().localeCompare((valB || '').toString());
        });

        if (direction === 'desc') {
            sorted.reverse();
        }
        return sorted;
    }, [products, sortBy]); 
    return {
        products: sortedProducts, 
        pagination,
        loading,
        error,
        currentPage,
        setCurrentPage, 
        retry: () => {  
             const pageToFetch = currentPage;
             setCurrentPage(0); 
             setTimeout(() => setCurrentPage(pageToFetch || 1), 0);
        }
    };
};