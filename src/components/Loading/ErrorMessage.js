import React from 'react';
import './ErrorMessage.css';

export const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message-container" role="alert">
            <p className="error-text">¡Error! {message || 'Ocurrió un error inesperado.'}</p>
            {onRetry && (
                <button onClick={onRetry} className="error-retry-btn">
                    Reintentar
                </button>
            )}
        </div>
    );
};