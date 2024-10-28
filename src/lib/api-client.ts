import axios from 'axios';
import { CreateMemoryDto } from './models/CreateMemoryDto';
import { MemoryDto } from './models/MemoryDto';
import { UpdateMemoryDto } from './models/UpdateMemoryDto';

const API_BASE_URL = '/api';

const apiClient = {
    async getMemories() {
        return await axios.get<{ memories: MemoryDto[] }>(`${API_BASE_URL}/memories`);
    },

    async createMemory(memory: CreateMemoryDto) {
        return await axios.post(`${API_BASE_URL}/memories`, memory);
    },

    async updateMemory(memoryId: string, memory: UpdateMemoryDto) {
        return await axios.put(`${API_BASE_URL}/memories/${memoryId}`, memory);
    },

    async deleteMemory(memoryId: string) {
        return await axios.delete(`${API_BASE_URL}/memories/${memoryId}`);
    },
};

export default apiClient;