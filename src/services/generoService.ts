import api from '../api/axios';
import type { 
  Genero, 
  CreateGeneroRequest, 
  UpdateGeneroRequest, 
  ApiResponse 
} from '../models/types';

export const generoService = {
  // Buscar todos os gêneros
  async getAll(): Promise<Genero[]> {
    try {
      const response = await api.get<ApiResponse<Genero[]>>('/Generos');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  },

  // Buscar gênero por ID
  async getById(id: number): Promise<Genero> {
    const response = await api.get<ApiResponse<Genero>>(`/Generos/${id}`);
    return response.data.data;
  },

  // Criar novo gênero
  async create(data: CreateGeneroRequest): Promise<Genero> {
    const response = await api.post<ApiResponse<Genero>>('/Generos', data);
    return response.data.data;
  },

  // Atualizar gênero
  async update(id: number, data: UpdateGeneroRequest): Promise<Genero> {
    const response = await api.put<ApiResponse<Genero>>(`/Generos/${id}`, data);
    return response.data.data;
  },

  // Deletar gênero
  async delete(id: number): Promise<void> {
    await api.delete(`/Generos/${id}`);
  }
}; 