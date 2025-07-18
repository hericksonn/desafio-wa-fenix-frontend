import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generoService } from '../../services/generoService';
import { useNotificationStore } from '../../store/useNotificationStore';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import type { Genero } from '../../models/types';
import './GeneroList.css';

export const GeneroList: React.FC = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    genero: Genero | null;
  }>({ isOpen: false, genero: null });

  const { addNotification } = useNotificationStore();

  const loadGeneros = async () => {
    try {
      setLoading(true);
      const data = await generoService.getAll();
      setGeneros(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao carregar gêneros: ${errorMessage}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGeneros();
  }, []);

  const handleDelete = async () => {
    if (!deleteDialog.genero) return;

    try {
      await generoService.delete(deleteDialog.genero.id);
      addNotification({
        type: 'success',
        message: 'Gênero excluído com sucesso!'
      });
      loadGeneros();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addNotification({
        type: 'error',
        message: `Erro ao excluir gênero: ${errorMessage}`
      });
    } finally {
      setDeleteDialog({ isOpen: false, genero: null });
    }
  };

  const openDeleteDialog = (genero: Genero) => {
    setDeleteDialog({ isOpen: true, genero });
  };

  if (loading) {
    return <LoadingSpinner message="Carregando gêneros..." />;
  }

  return (
    <div className="genero-list-container">
      <div className="genero-list-header">
        <h1>Gêneros Literários</h1>
        <Link to="/generos/novo" className="btn btn-primary">
          Novo Gênero
        </Link>
      </div>

      {generos.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum gênero encontrado.</p>
          <Link to="/generos/novo" className="btn btn-primary">
            Criar primeiro gênero
          </Link>
        </div>
      ) : (
        <div className="genero-grid">
          {generos.map((genero) => (
            <div key={genero.id} className="genero-card">
              <div className="genero-card-header">
                <h3>{genero.nome}</h3>
                <div className="genero-card-actions">
                  <Link
                    to={`/generos/editar/${genero.id}`}
                    className="btn btn-sm btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => openDeleteDialog(genero)}
                    className="btn btn-sm btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
              {genero.descricao && (
                <p className="genero-description">{genero.descricao}</p>
              )}
              <div className="genero-meta">
                <small>
                  Criado em: {new Date(genero.dataCriacao).toLocaleDateString('pt-BR')}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o gênero "${deleteDialog.genero?.nome}"?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, genero: null })}
      />
    </div>
  );
}; 