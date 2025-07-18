import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status', { hidden: true });
    expect(spinner).toBeInTheDocument();
    
    const message = screen.getByText('Carregando...');
    expect(message).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    const customMessage = 'Carregando dados...';
    render(<LoadingSpinner message={customMessage} />);
    
    const message = screen.getByText(customMessage);
    expect(message).toBeInTheDocument();
  });

  it('renders without message when message is empty', () => {
    render(<LoadingSpinner message="" />);
    
    const message = screen.queryByText('Carregando...');
    expect(message).not.toBeInTheDocument();
  });

  it('applies correct size class', () => {
    const { rerender } = render(<LoadingSpinner size="small" />);
    
    let container = screen.getByRole('status', { hidden: true }).parentElement;
    expect(container).toHaveClass('loading-small');

    rerender(<LoadingSpinner size="large" />);
    container = screen.getByRole('status', { hidden: true }).parentElement;
    expect(container).toHaveClass('loading-large');
  });
}); 