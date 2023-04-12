import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { LoginCredentials } from 'src/types/login';

import loginImg from '../../assets/login.jpg'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;

export default function Login() {
    const { t } = useTranslation();

    const validateInputs = (values: LoginCredentials) => {
        const errors: Partial<LoginCredentials> = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        } else if (
            values.password &&
            !passwordRegex.test(values.password)
        ) {
            errors.password = 'Invalid password';
        }
        return errors;
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt="" />
            </div>

            <div className='bg-gray-800 flex flex-col justify-center'>
                <Formik
                    initialValues={{ username: '', password: '', rememberMe: false }}
                    validate={validateInputs}
                    onSubmit={(values, { setSubmitting }) => {
                        alert(JSON.stringify(values, null, 2));
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit
                    }) => (
                        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={handleSubmit}>
                            <h2 className='text-4xl dark:text-white font-bold text-center'>{t('signin')}</h2>
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>{t('username')}</label>
                                <Field name="username" className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" required data-testid="username-input" />
                                <ErrorMessage name="username" component="div" className='text-red-600' />
                            </div>
                            <div className='flex flex-col text-gray-400 py-2'>
                                <label>{t('password')}</label>
                                <Field name="password" className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" required data-testid="password-input" />
                                <ErrorMessage name="password" component="div" className='text-red-600' />
                            </div>
                            <div className='flex justify-between text-gray-400 py-2'>
                                <p className='flex items-center'><Field name="rememberMe" className='mr-2' type="checkbox" data-testid="rememberMe-input" /> {t('rememberMe')}</p>
                                <p>{t('forgotPassword')}</p>
                            </div>
                            <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type='submit' disabled={isSubmitting} data-testid="submit-button">{t('signin').toUpperCase()}</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
