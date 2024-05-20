import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorMessage from '../../../components/errorMessage/ErrorMessage';

describe('ErrorMessage', () => {
    it('renders error message correctly', () => {
      const errorMessage = 'This is an error message';
      render(<ErrorMessage message={errorMessage} />);
  
      const errorMessageElement = screen.getByTestId('error-message');
      expect(errorMessageElement).toBeInTheDocument();
      expect(errorMessageElement).toHaveTextContent(errorMessage);
    });
  });