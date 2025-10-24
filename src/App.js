import React, { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { Controls } from './components/Controls/Controls';
import { ProductList } from './components/ProductList/ProductList';
import { Pagination } from './components/Pagination/Pagination';
import { ProductDetailModal } from './components/ProductDetailModal/ProductDetailModal';
import './App.css';
function App() {
    const [format, setFormat] = useState('application/json');
    const [pageSize, setPageSize] = useState(6);
    const [sortBy, setSortBy] = useState('name:asc');
    const [selectedProductId, setSelectedProductId] = useState(null);
    const { 
        products, 
        pagination, 
        loading, 
        error, 
        currentPage, 
        setCurrentPage,
        retry
    } = useProducts(format, pageSize, sortBy);
    const handleProductClick = (id) => {
        setSelectedProductId(id);
    };
    const handleCloseModal = () => {
        setSelectedProductId(null);
    };
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Catálogo de Productos (Lab 10)</h1>
            </header>
            <Controls
                format={format}
                onFormatChange={(e) => setFormat(e.target.value)}
                pageSize={pageSize}
                onPageSizeChange={(e) => setPageSize(Number(e.target.value))}
                sortBy={sortBy}
                onSortByChange={(e) => setSortBy(e.target.value)}
            />
            <main className="app-main">
                <ProductList
                    products={products}
                    loading={loading}
                    error={error}
                    onProductClick={handleProductClick}
                    onRetry={retry}
                />
            </main>
            <footer className="app-footer">
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={setCurrentPage}
                    disabled={loading || !!error}
                />
            </footer>
            {selectedProductId && (
                <ProductDetailModal
                    productId={selectedProductId}
                    format={format}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default App;
