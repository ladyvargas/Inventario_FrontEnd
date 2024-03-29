import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Dialog from '@material-ui/core/Dialog';
import { MdClose } from 'react-icons/md';

import Switch from '~/components/Switch';
import { Title, Content, Row, Label, Divider, DialogActions } from './styles';
import { Form, Input, Button } from '~/components/DefaultStyle';
import Radio from '~/components/Radio';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'No mínimo 3 caracteres')
    .required('El nombre es obligatorio'),
  dni: Yup.string()
    .min(3, 'Mínimo 10 caracteres')
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

export default function UserChange({
  title,
  user,
  onCancel,
  onConfirm,
  allowModify,
}) {
  const [isActive, setIsActive] = useState(true);
  const [typeUser, setTypeUser] = useState('');

  useEffect(() => {
    setIsActive(user.active);
    if (user.type) setTypeUser(user.type);
  }, [user]);

  function handleSubmit({ dni, name, lastName, email, password, fecha_nacimiento, direccion,telefono }) {
    const newUser = {
      id: user.id,
      dni,
      name,
      lastName,
      email,
      password,
      fecha_nacimiento,
      direccion,
      telefono,
      isVacuna: isActive,
      isAdmin: typeUser==="Administrador",
      active: isActive,
    };
    onConfirm(newUser);
  }

  return (
    <Dialog open onClose={() => onCancel(false)}>
      <Title>
        <h2>{title}</h2>
        <MdClose size={20} color="#fff" onClick={() => onCancel(false)} />
      </Title>
      <Content>
        <Form initialData={user} schema={schema} onSubmit={handleSubmit}>
          <Row>
            <p>Ativar usuario</p>
            <Switch
              defaultChecked={isActive}
              onChange={e => setIsActive(e.target.checked)}
              disabled={!allowModify}
            />
          </Row>
          <Divider />
          <Label>Tipo de usuario</Label>
          <Radio
            name="type"
            value="Usuario"
            label="Usuario"
            disabled={!allowModify}
            defaultChecked={typeUser === 'Usuario'}
            onChange={e => setTypeUser(e.target.value)}
          />
          <Radio
            name="type"
            value="Administrador"
            label="Administrador"
            disabled={!allowModify}
            defaultChecked={typeUser === 'Administrador'}
            onChange={e => setTypeUser(e.target.value)}
          />
          <Divider />
          <Input name="name" disabled={!allowModify} type="text" label="Nombre" />
          <Input
            name="lastName"
            disabled={!allowModify}
            type="text"
            label="Apellido"
          />
          <Input
            name="dni"
            disabled={!allowModify}
            type="text"
            label="DNI"
          />
          <Input
            name="fecha_nacimiento"
            disabled={!allowModify}
            type="date"
            label="Fecha de nacimiento"
          />
          <Input
            name="direccion"
            disabled={!allowModify}
            type="text"
            label="direccion"
          />
          <Input
            name="telefono"
            disabled={!allowModify}
            type="text"
            label="telefono"
          />
          <Input
            name="email"
            disabled={!allowModify}
            type="email"
            label="E-mail"
          />
          {allowModify && (
            <Input name="password" type="password" label="Senha" />
          )}
          <DialogActions>
            <Button type="button" background="#a1a1a1" onClick={onCancel}>
              Cancelar
            </Button>
            {allowModify && <Button type="submit">Registrar</Button>}
          </DialogActions>
        </Form>
      </Content>
    </Dialog>
  );
}

UserChange.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    active: PropTypes.bool,
    isAdmin: PropTypes.bool,
    type: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  allowModify: PropTypes.bool.isRequired,
};
