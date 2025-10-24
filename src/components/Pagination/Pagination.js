import React from 'react';
import './Pagination.css';

export const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {
    
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    if (totalPages <= 1) {
        return null;
    }
    return (
        <nav className="pagination-container" aria-label="Paginación de productos">
            <button 
                onClick={handlePrevious} 
                disabled={currentPage === 1 || disabled}
            >
                Anterior
            </button>
            
            <span className="pagination-info" aria-live="polite">
                Página {currentPage} / {totalPages} 
            </span>

            <button 
                onClick={handleNext} 
                disabled={currentPage === totalPages || disabled}
            >
                Siguiente
            </button>
        </nav>
    );
};