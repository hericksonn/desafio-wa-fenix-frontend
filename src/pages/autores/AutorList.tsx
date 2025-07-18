import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../../services/autorService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Autor } from '../../models/types';
import './AutorList.css';

export const AutorList: React.FC = () => {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    autor: Autor | null;
  }>({ isOpen: false, autor: null });

  const { addNotification } = useNotificationStore();

  const loadAutores = async () => {
    try {
      setLoading(true);
      const data = await autorService.getAll();
      setAutores(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar autores: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAutores();
  }, []);

  const handleDelete = async () => {
    if (!deleteDialog.autor) return;

    try {
      await autorService.delete(deleteDialog.autor.id);
      addNotification({
        type: 'success',
        message: 'Autor excluído com sucesso!'
      });
      loadAutores();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao excluir autor: ${errorMessage}`
      });
    } finally {
      setDeleteDialog({ isOpen: false, autor: null });
    }
  };

  const openDeleteDialog = (autor: Autor) => {
    setDeleteDialog({ isOpen: true, autor });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <LoadingSpinner message="Carregando autores..." />;
  }

  return (
    <div className="autor-list-container">
      <div className="autor-list-header">
        <h1>Autores</h1>
        <Link to="/autores/novo" className="btn btn-primary">
          Novo Autor
        </Link>
      </div>

      {autores.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum autor encontrado.</p>
          <Link to="/autores/novo" className="btn btn-primary">
            Criar primeiro autor
          </Link>
        </div>
      ) : (
        <div className="autor-grid">
          {autores.map((autor) => (
            <div key={autor.id} className="autor-card">
              <div className="autor-card-header">
                <h3>{autor.nome}</h3>
                <div className="autor-card-actions">
                  <Link
                    to={`/autores/editar/${autor.id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => openDeleteDialog(autor)}
                    className="btn btn-sm btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              {autor.biografia && (
                <p className="autor-biography">{autor.biografia}</p>
              )}
              <div className="autor-meta">
                {autor.dataNascimento && (
                  <div className="autor-birth">
                    <strong>Data de Nascimento:</strong> {formatDate(autor.dataNascimento)}
                  </div>
                )}
                <div className="autor-created">
                  <small>
                    Criado em: {formatDate(autor.dataCriacao)}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o autor "${deleteDialog.autor?.nome}"?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, autor: null })}
      />
    </div>
  );
}; 