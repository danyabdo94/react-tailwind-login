import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/tests/i18n-wrapper';
import userEvent from '@testing-library/user-event';

import Login from '..';

describe('<Login />', () => {
    it('should not throw error', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );
        const password = screen.getByTestId("password-input")
        const username = screen.getByTestId("password-input")
        const rememberMe = screen.getByTestId("rememberMe-input")
        expect(password).toBeInTheDocument();
        expect(username).toBeInTheDocument();
        expect(rememberMe).toBeInTheDocument();
    });

    it('Should show error if no data added', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );
        const submitButton = screen.getByTestId("submit-button")
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.queryAllByText('Required')).toHaveLength(2);
        })
    });

    it('Should show error if added a wrong text', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <Login />
            </I18nextProvider>
        );
        const password = screen.getByTestId("password-input")
        const submitButton = screen.getByTestId("submit-button")
        userEvent.type(password, "ABC");
        userEvent.click(submitButton)

        await waitFor(() =>
            expect(screen.getByText('Invalid password')).toBeInTheDocument()
        )
    });

});
