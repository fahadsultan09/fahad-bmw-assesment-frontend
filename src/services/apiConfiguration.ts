
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/cars';

export const fetchCars = () => axios.get(API_BASE);
export const deleteCar = (id: string) => axios.delete(`${API_BASE}/${id}`);