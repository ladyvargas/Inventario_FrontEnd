import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Form, Input } from '~/components/DefaultStyle';
import spinner from '~/assets/loading-bubbles.svg';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(3, 'No mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="Correo Electronico" />
      <Input name="password" type="password" placeholder="Contraseña" />

      <button type="submit">
        {loading ? (
          <>
            <img src={spinner} alt="loader" />
            Cargando...
          </>
        ) : (
          'Acceder'
        )}
      </button>
      <Link to="/register">Registrarme</Link>
    </Form>
  );
}
