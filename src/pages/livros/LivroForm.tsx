import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { livroService } from '../../services/livroService';
import { autorService } from '../../services/autorService';
import { generoService } from '../../services/generoService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { 
  Livro, 
  CreateLivroRequest, 
  UpdateLivroRequest, 
  Autor, 
  Genero 
} from '../../models/types';
import './LivroForm.css';

const validationSchema = Yup.object({
  titulo: Yup.string()
    .required('Título é obrigatório')
    .min(2, 'Título deve ter pelo menos 2 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres')
    .trim(),
  autorId: Yup.number()
    .required('Autor é obrigatório')
    .positive('Autor é obrigatório')
    .typeError('Selecione um autor válido'),
  generoId: Yup.number()
    .required('Gênero é obrigatório')
    .positive('Gênero é obrigatório')
    .typeError('Selecione um gênero válido')
});

export const LivroForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  
  const [livro, setLivro] = useState<Livro | null>(null);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const isEditing = !!id;

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setInitialLoading(true);
      
      const [autoresData, generosData] = await Promise.all([
        autorService.getAll(),
        generoService.getAll()
      ]);
      
      setAutores(autoresData);
      setGeneros(generosData);

      // Se estiver editando, carregar o livro
      if (id) {
        const livroData = await livroService.getById(parseInt(id));
        setLivro(livroData);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar dados: ${errorMessage}`
      });
      navigate('/livros');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (values: CreateLivroRequest | UpdateLivroRequest) => {
    try {
      setLoading(true);
      
      if (isEditing && id) {
        await livroService.update(parseInt(id), values as UpdateLivroRequest);
        addNotification({
          type: 'success',
          message: 'Livro atualizado com sucesso!'
        });
      } else {
        await livroService.create(values as CreateLivroRequest);
        addNotification({
          type: 'success',
          message: 'Livro criado com sucesso!'
        });
      }
      
      navigate('/livros');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao ${isEditing ? 'atualizar' : 'criar'} livro: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner message="Carregando dados..." />;
  }

  const initialValues = {
    titulo: livro?.titulo || '',
    autorId: livro?.autorId || 0,
    generoId: livro?.generoId || 0
  };

  return (
    <div className="livro-form-container">
      <div className="livro-form-header">
        <h1>{isEditing ? 'Editar Livro' : 'Novo Livro'}</h1>
      </div>

      <div className="livro-form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className="livro-form">
              <div className="form-group">
                <label htmlFor="titulo">Título *</label>
                <Field
                  type="text"
                  id="titulo"
                  name="titulo"
                  className="form-control"
                  placeholder="Digite o título do livro"
                />
                <ErrorMessage name="titulo" component="div" className="error-message" />
              </div>



              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="autorId">Autor *</label>
                  <Field
                    as="select"
                    id="autorId"
                    name="autorId"
                    className="form-control"
                  >
                    <option value="">Selecione um autor</option>
                    {autores.map((autor) => (
                      <option key={autor.id} value={autor.id}>
                        {autor.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="autorId" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="generoId">Gênero *</label>
                  <Field
                    as="select"
                    id="generoId"
                    name="generoId"
                    className="form-control"
                  >
                    <option value="">Selecione um gênero</option>
                    {generos.map((genero) => (
                      <option key={genero.id} value={genero.id}>
                        {genero.nome}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="generoId" component="div" className="error-message" />
                </div>
              </div>



              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/livros')}
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || isSubmitting || !isValid}
                >
                  {loading ? (
                    <LoadingSpinner size="small" message="" />
                  ) : (
                    isEditing ? 'Atualizar' : 'Criar'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}; 