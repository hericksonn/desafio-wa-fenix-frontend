import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { autorService } from '../../services/autorService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { Autor, CreateAutorRequest, UpdateAutorRequest } from '../../models/types';
import './AutorForm.css';

const validationSchema = Yup.object({
  nome: Yup.string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  biografia: Yup.string()
    .max(1000, 'Biografia deve ter no máximo 1000 caracteres')
    .optional(),
  dataNascimento: Yup.date()
    .max(new Date(), 'Data de nascimento não pode ser no futuro')
    .nullable()
    .optional()
});

export const AutorForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  
  const [autor, setAutor] = useState<Autor | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);

  const isEditing = !!id;

  useEffect(() => {
    if (id) {
      loadAutor();
    }
  }, [id]);

  const loadAutor = async () => {
    try {
      setInitialLoading(true);
      const data = await autorService.getById(parseInt(id!));
      setAutor(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar autor: ${errorMessage}`
      });
      navigate('/autores');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (values: CreateAutorRequest | UpdateAutorRequest) => {
    try {
      setLoading(true);
      
      if (isEditing && id) {
        await autorService.update(parseInt(id), values as UpdateAutorRequest);
        addNotification({
          type: 'success',
          message: 'Autor atualizado com sucesso!'
        });
      } else {
        await autorService.create(values as CreateAutorRequest);
        addNotification({
          type: 'success',
          message: 'Autor criado com sucesso!'
        });
      }
      
      navigate('/autores');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao ${isEditing ? 'atualizar' : 'criar'} autor: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner message="Carregando autor..." />;
  }

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const initialValues = {
    nome: autor?.nome || '',
    biografia: autor?.biografia || '',
    dataNascimento: autor?.dataNascimento ? formatDateForInput(autor.dataNascimento) : ''
  };

  return (
    <div className="autor-form-container">
      <div className="autor-form-header">
        <h1>{isEditing ? 'Editar Autor' : 'Novo Autor'}</h1>
      </div>

      <div className="autor-form-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className="autor-form">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <Field
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  placeholder="Digite o nome do autor"
                />
                <ErrorMessage name="nome" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <Field
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  className="form-control"
                />
                <ErrorMessage name="dataNascimento" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="biografia">Biografia</label>
                <Field
                  as="textarea"
                  id="biografia"
                  name="biografia"
                  className="form-control"
                  placeholder="Digite uma biografia para o autor (opcional)"
                  rows={6}
                />
                <ErrorMessage name="biografia" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/autores')}
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