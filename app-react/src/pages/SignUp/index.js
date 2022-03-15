import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Form, Input } from '~/components/DefaultStyle';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .required('El nombre es obligatorio'),
  dni: Yup.number()
    .typeError("El DNI debe ser valor númerico")
    .min(10, 'Mínimo 10 caracteres')
    .required('El DNI es obligatorio'),
  lastName: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .required('El apellido es obligatorio'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string()
    .min(3, 'No mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ dni, name, lastName, email, password, fecha_nacimiento, direccion,telefono,isVacuna }) {
    dispatch(signUpRequest(dni, name, lastName, email, password, fecha_nacimiento, direccion,telefono,isVacuna));
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="dni" type="text" placeholder="DNI" />
      <Input name="name" type="text" placeholder="Nombre" pattern="^[A-Za-z]+$" />
      <Input name="lastName" type="text" placeholder="Apellido" pattern="^[A-Za-z]+$" />
      <Input name="email" type="email" placeholder="Correo Electronico" />
      <Input name="password" type="password" placeholder="Contraseña" />
      <Input name="fecha_nacimiento" type="hidden" value="1" />
      <Input name="direccion" type="hidden" value="1"  />
      <Input name="telefono" type="hidden" value="1" />
      <Input name="isVacuna" type="hidden" value="true" />

      <button type="submit">Registrar</button>
      <Link to="/">Volver a inicio</Link>
    </Form>
  );
}
