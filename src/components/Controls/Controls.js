import React from 'react';
import './Controls.css';

export const Controls = ({ 
    format, onFormatChange, 
    pageSize, onPageSizeChange, 
    sortBy, onSortByChange 
}) => {
    return (
        <div className="controls-container">
            
            <div className="control-group">
                <label htmlFor="format-select">Formato:</label>
                <select id="format-select" value={format} onChange={onFormatChange}>
                    <option value="application/json">JSON</option>
                    <option value="application/xml">XML</option>
                </select>
            </div>

            
            <div className="control-group">
                <label htmlFor="pagesize-select">Por Página:</label>
                <select id="pagesize-select" value={pageSize} onChange={onPageSizeChange}>
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                    <option value={48}>48</option>
                </select>
            </div>

            
            <div className="control-group">
                <label htmlFor="sortby-select">Ordenar por:</label>
                <select id="sortby-select" value={sortBy} onChange={onSortByChange}>
                    <option value="name:asc">Nombre (A-Z)</option> [cite: 36]
                    <option value="name:desc">Nombre (Z-A)</option>
                    <option value="price:asc">Precio (Menor a Mayor)</option> [cite: 38]
                    <option value="price:desc">Precio (Mayor a Menor)</option>
                </select>
            </div>
        </div>
    );
};