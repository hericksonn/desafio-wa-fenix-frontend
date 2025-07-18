import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../../services/livroService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Livro } from '../../models/types';
import './LivroList.css';

export const LivroList: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    livro: Livro | null;
  }>({ isOpen: false, livro: null });

  const { addNotification } = useNotificationStore();

  const loadLivros = async () => {
    try {
      setLoading(true);
      const data = await livroService.getAll();
      setLivros(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar livros: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLivros();
  }, []);

  const handleDelete = async () => {
    if (!deleteDialog.livro) return;

    try {
      await livroService.delete(deleteDialog.livro.id);
      addNotification({
        type: 'success',
        message: 'Livro excluído com sucesso!'
      });
      loadLivros();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao excluir livro: ${errorMessage}`
      });
    } finally {
      setDeleteDialog({ isOpen: false, livro: null });
    }
  };

  const openDeleteDialog = (livro: Livro) => {
    setDeleteDialog({ isOpen: true, livro });
  };

  if (loading) {
    return <LoadingSpinner message="Carregando livros..." />;
  }

  return (
    <div className="livro-list-container">
      <div className="livro-list-header">
        <h1>Livros</h1>
        <Link to="/livros/novo" className="btn btn-primary">
          Novo Livro
        </Link>
      </div>

      {livros.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro encontrado.</p>
          <Link to="/livros/novo" className="btn btn-primary">
            Criar primeiro livro
          </Link>
        </div>
      ) : (
        <div className="livro-grid">
          {livros.map((livro) => (
            <div key={livro.id} className="livro-card">
              <div className="livro-card-header">
                <h3>{livro.titulo}</h3>
                <div className="livro-card-actions">
                  <Link
                    to={`/livros/editar/${livro.id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => openDeleteDialog(livro)}
                    className="btn btn-sm btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              
              <div className="livro-info">
                <div className="livro-author">
                  <strong>Autor:</strong> {livro.autorNome}
                </div>
                <div className="livro-genre">
                  <strong>Gênero:</strong> {livro.generoNome}
                </div>
              </div>


            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o livro "${deleteDialog.livro?.titulo}"?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, livro: null })}
      />
    </div>
  );
}; 