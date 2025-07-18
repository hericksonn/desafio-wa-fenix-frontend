import api from '../api/axios';
import type { 
  Autor, 
  CreateAutorRequest, 
  UpdateAutorRequest, 
  ApiResponse 
} from '../models/types';

export const autorService = {
  // Buscar todos os autores
  async getAll(): Promise<Autor[]> {
    const response = await api.get<ApiResponse<Autor[]>>('/Autores');
    return response.data.data;
  },

  // Buscar autor por ID
  async getById(id: number): Promise<Autor> {
    const response = await api.get<ApiResponse<Autor>>(`/Autores/${id}`);
    return response.data.data;
  },

  // Criar novo autor
  async create(data: CreateAutorRequest): Promise<Autor> {
    const response = await api.post<ApiResponse<Autor>>('/Autores', data);
    return response.data.data;
  },

  // Atualizar autor
  async update(id: number, data: UpdateAutorRequest): Promise<Autor> {
    const response = await api.put<ApiResponse<Autor>>(`/Autores/${id}`, data);
    return response.data.data;
  },

  // Deletar autor
  async delete(id: number): Promise<void> {
    await api.delete(`/Autores/${id}`);
  }
}; 