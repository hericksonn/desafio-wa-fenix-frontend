export interface Genero {
  id: number;
  nome: string;
  descricao?: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface Autor {
  id: number;
  nome: string;
  biografia?: string;
  dataNascimento?: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface Livro {
  id: number;
  titulo: string;
  generoId: number;
  autorId: number;
  generoNome: string;
  autorNome: string;
}

export interface CreateGeneroRequest {
  nome: string;
  descricao?: string;
}

export interface UpdateGeneroRequest {
  nome?: string;
  descricao?: string;
}

export interface CreateAutorRequest {
  nome: string;
  biografia?: string;
  dataNascimento?: string;
}

export interface UpdateAutorRequest {
  nome?: string;
  biografia?: string;
  dataNascimento?: string;
}

export interface CreateLivroRequest {
  titulo: string;
  autorId: number;
  generoId: number;
}

export interface UpdateLivroRequest {
  titulo?: string;
  autorId?: number;
  generoId?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
} 