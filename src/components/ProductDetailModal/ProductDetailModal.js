import React, { useState, useEffect } from 'react';
import { getProductById } from '../../services/apiService';
import { RawDataViewer } from '../RawDataViewer/RawDataViewer';
import { ErrorMessage } from '../Loading/ErrorMessage';
import './ProductDetailModal.css';
export const ProductDetailModal = ({ productId, format, onClose }) => {
    const [product, setProduct] = useState(null);
    const [rawData, setRawData] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRawView, setIsRawView] = useState(false); 
    const fetchDetail = async (id, fmt) => {
        setLoading(true);
        setError(null);
        try {
            const { data, rawData: raw } = await getProductById(id, fmt);
            setProduct(data);

            if (fmt === 'application/json') {
                setRawData(JSON.stringify(JSON.parse(raw).data, null, 2));
            } else {
                setRawData(raw); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (productId) {
            setIsRawView(false); 
            fetchDetail(productId, format);
        }
    }, [productId, format]);

    const handleRetry = () => {
        fetchDetail(productId, format);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">&times;</button>
                
                {loading && <p>Cargando detalle...</p>} 
                
                {error && <ErrorMessage message={error} onRetry={handleRetry} />}

                {product && !loading && !error && (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title">{product.name}</h2>
                            <div className="modal-toggle">
                                <label htmlFor="raw-toggle">Vista Amigable</label>
                                <input 
                                    type="checkbox" 
                                    id="raw-toggle" 
                                    className="toggle-switch"
                                    checked={isRawView}
                                    onChange={() => setIsRawView(!isRawView)}
                                />
                                <label htmlFor="raw-toggle">Raw</label>
                            </div>
                        </div>

                        <div className="modal-body">
                            {isRawView ? (
                                <RawDataViewer 
                                    data={rawData} 
                                    format={format.includes('xml') ? 'xml' : 'json'} 
                                />
                            ) : (
                                <ul className="product-details-list">
                                    <li><strong>SKU:</strong> {product.sku}</li>
                                    <li><strong>Precio:</strong> ${product.price?.toFixed(2)}</li>
                                    <li><strong>Stock:</strong> {product.stock} unidades</li>
                                    <li><strong>Categoría:</strong> {product.category}</li>
                                </ul>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};