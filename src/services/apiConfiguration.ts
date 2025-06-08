import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/cars';

export const fetchCars = async () => {
    try {
        const response = await axios.get(API_BASE);
        return { data: response.data.data, error: null };
    } catch (error: any) {
        console.error('Fetch cars failed:', error.message || error);
        return {
            data: null,
            error: error?.response?.data?.message || error.message || 'Network Error',
        };
    }
};

export const deleteCar = async (id: string) => {
    try {
        await axios.delete(`${API_BASE}/${id}`);
        return { success: true, error: null };
    } catch (error: any) {
        console.error('Delete car failed:', error.message || error);
        return {
            success: false,
            error: error?.response?.data?.message || error.message || 'Network Error',
        };
    }
};
