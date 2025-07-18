import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { generoService } from '../../services/generoService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { Genero, CreateGeneroRequest, UpdateGeneroRequest } from '../../models/types';
import './GeneroForm.css';

const validationSchema = Yup.object({
  nome: Yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(), // Remove espaços em branco
  descricao: Yup.string()
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .optional()
});

export const GeneroForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  
  const [genero, setGenero] = useState<Genero | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      loadGenero();
    }
  }, [id]);

  const loadGenero = async () => {
    try {
      setInitialLoading(true);
      const data = await generoService.getById(parseInt(id!));
      setGenero(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar gênero: ${errorMessage}`
      });
      navigate('/generos');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (values: CreateGeneroRequest | UpdateGeneroRequest) => {
    try {
      setLoading(true);
      
      if (!values.nome || values.nome.trim().length < 2) {
        throw new Error('Nome inválido');
      }
      
      if (isEditing && id) {
        await generoService.update(parseInt(id), values as UpdateGeneroRequest);
        addNotification({
          type: 'success',
          message: 'Gênero atualizado com sucesso!'
        });
      } else {
        await generoService.create(values as CreateGeneroRequest);
        addNotification({
          type: 'success',
          message: 'Gênero criado com sucesso!'
        });
      }
      
      navigate('/generos');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao ${isEditing ? 'atualizar' : 'criar'} gênero: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner message="Carregando gênero..." />;
  }

  const initialValues = {
    nome: genero?.nome || '',
    descricao: genero?.descricao || ''
  };

  return (
    <div className="genero-form-container">
      <div className="genero-form-header">
        <h1>{isEditing ? 'Editar Gênero' : 'Novo Gênero'}</h1>
      </div>

      <div className="genero-form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className="genero-form">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <Field
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  placeholder="Digite o nome do gênero"
                />
                <ErrorMessage name="nome" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <Field
                  as="textarea"
                  id="descricao"
                  name="descricao"
                  className="form-control"
                  placeholder="Digite uma descrição para o gênero (opcional)"
                  rows={4}
                />
                <ErrorMessage name="descricao" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/generos')}
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