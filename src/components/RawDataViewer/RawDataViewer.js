import React from 'react';
import './RawDataViewer.css';

export const RawDataViewer = ({ data, format }) => {
    return (
        <div className="raw-viewer-container">
            <pre className={`raw-viewer-pre ${format}`}>
                <code>
                    {data}
                </code>
            </pre>
        </div>
    );
};