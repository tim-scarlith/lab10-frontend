const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Realiza una petición a la API.
 * @param {string} endpoint 
 * @param {string} format 
 * @param {object} options 
 * @returns {Promise<object>} 
 */
const apiFetch = async (endpoint, format, options = {}) => {
    if (!API_KEY) {
        throw new Error("Error de configuración: REACT_APP_API_KEY no está definida en .env");
    }
    const headers = new Headers({
        'X-Api-Key': API_KEY,
        'Accept': format,
        ...options.headers,
    });
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    const contentType = response.headers.get('content-type') || '';
    const rawData = await response.text();
    if (!response.ok) {
        let errorData;
        try {
            if (contentType.includes('application/xml')) {
                errorData = parseErrorXml(rawData); 
            } else {
                errorData = JSON.parse(rawData);
            }
        } catch (e) {
            errorData = { error: { message: 'Error de red o respuesta no parseable.' } };
        }
        
        throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
    }
    if (response.status === 204) {
        return { data: null, rawData: '', contentType };
    }
    let data;
    if (contentType.includes('application/xml')) {
        data = parseSuccessXml(rawData);
    } else {
        data = JSON.parse(rawData).data; 
    }

    return { data, rawData, contentType };
};
export const getProducts = (page, limit, format) => {
    return apiFetch(`/products?page=${page}&limit=${limit}`, format);
};
export const getProductById = (id, format) => {
    return apiFetch(`/products/${id}`, format);
};
const parser = new DOMParser();

const parseErrorXml = (xmlText) => {
    try {
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const errorNode = xmlDoc.querySelector("error");
        if (!errorNode) return { error: { message: "Error XML malformado" } };
        
        const message = errorNode.querySelector("message")?.textContent || "Error desconocido";
        return { error: { message } };
    } catch (e) {
        return { error: { message: "Error al parsear XML de error" } };
    }
};
const parseSuccessXml = (xmlText) => {
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const dataNode = xmlDoc.querySelector("data");
    if (!dataNode) return null;
    const paginationNode = dataNode.querySelector("pagination");   
    if (paginationNode) {
        const products = Array.from(dataNode.querySelectorAll("products")).map(parseProductNode);
        const pagination = {
            totalItems: parseInt(paginationNode.querySelector("totalItems")?.textContent || '0', 10),
            totalPages: parseInt(paginationNode.querySelector("totalPages")?.textContent || '0', 10),
            currentPage: parseInt(paginationNode.querySelector("currentPage")?.textContent || '0', 10),
            limit: parseInt(paginationNode.querySelector("limit")?.textContent || '0', 10),
        };
        return { products, pagination };
    } else {
        return parseProductNode(dataNode);
    }
};
const parseProductNode = (node) => {
    return {
        id: node.querySelector("id")?.textContent || '',
        name: node.querySelector("name")?.textContent || '',
        sku: node.querySelector("sku")?.textContent || '',
        price: parseFloat(node.querySelector("price")?.textContent || '0'),
        stock: parseInt(node.querySelector("stock")?.textContent || '0', 10),
        category: node.querySelector("category")?.textContent || '',
    };
};