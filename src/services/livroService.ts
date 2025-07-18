import api from '../api/axios';
import type { 
  Livro, 
  CreateLivroRequest, 
  UpdateLivroRequest, 
  ApiResponse 
} from '../models/types';

export const livroService = {
  // Buscar todos os livros
  async getAll(): Promise<Livro[]> {
    const response = await api.get<ApiResponse<Livro[]>>('/Livros');
    return response.data.data;
  },

  // Buscar livro por ID
  async getById(id: number): Promise<Livro> {
    const response = await api.get<ApiResponse<Livro>>(`/Livros/${id}`);
    return response.data.data;
  },

  // Criar novo livro
  async create(data: CreateLivroRequest): Promise<Livro> {
    const response = await api.post<ApiResponse<Livro>>('/Livros', data);
    return response.data.data;
  },

  // Atualizar livro
  async update(id: number, data: UpdateLivroRequest): Promise<Livro> {
    const response = await api.put<ApiResponse<Livro>>(`/Livros/${id}`, data);
    return response.data.data;
  },

  // Deletar livro
  async delete(id: number): Promise<void> {
    await api.delete(`/Livros/${id}`);
  },

  // Buscar livros por autor
  async getByAutor(autorId: number): Promise<Livro[]> {
    const response = await api.get<ApiResponse<Livro[]>>(`/Livros/autor/${autorId}`);
    return response.data.data;
  },

  // Buscar livros por gênero
  async getByGenero(generoId: number): Promise<Livro[]> {
    const response = await api.get<ApiResponse<Livro[]>>(`/Livros/genero/${generoId}`);
    return response.data.data;
  }
}; 