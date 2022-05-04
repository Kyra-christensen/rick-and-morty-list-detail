import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('should render a list of characters and a detail page when a character is clicked on', async () => {
    render(
      <MemoryRouter
        initialEntries={['/', '/characters/2']}
        initialIndex={0}
      >
        <App/>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    const link = await screen.findByText('Morty Smith');

    userEvent.click(link);

    const mortyImg = await screen.findByAltText('Image of Morty Smith');

    expect(mortyImg).toBeInTheDocument();
  })
})