import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  removeUserSuccess,
  updateUserSuccess,
  getUsersSuccess,
  saveUserSuccess,
} from './actions';

export function* removeUser({ payload }) {
  try {
    const userId = payload.data;

    yield call(api.delete, `users/${userId}`);

    yield put(removeUserSuccess(userId));

    toast.success('¡usuario eliminado con éxito!');
  } catch (err) {
    toast.error('Error al eliminar el usuario, por favor, inténtelo de nuevo.');
  }
}

export function* updateUser({ payload }) {
  try {
    const {
      id,
      dni,
      name,
      lastName,
      password,
      email,
      fecha_nacimiento,
      direccion,
      telefono,
      isVacuna,
      isAdmin,
      active,
    } = payload.data;

    const user = {
      id,
      dni,
      name,
      lastName,
      password,
      email,
      fecha_nacimiento,
      direccion,
      telefono,
      isVacuna,
      isAdmin,
      active,
    };

    yield call(api.put, `users/${user.id}`, user);

    yield put(updateUserSuccess(user));

    toast.success('¡usuario actualizado con éxito!');
  } catch (err) {
    toast.error('Error al actualizar el usuario, compruebe sus datos.');
  }
}

export function* saveUser({ payload }) {
  try {
    const { dni, name, lastName, password, email, fecha_nacimiento, direccion,telefono,isVacuna, isAdmin, active } = payload.data;

    const user = {
      dni,
      name,
      lastName,
      password,
      email,
      fecha_nacimiento,
      direccion,
      telefono,
      isVacuna,
      isAdmin,
      active,
    };

    const response = yield call(api.post, `users`, user);
    const newUser = response.data;

    yield put(saveUserSuccess(newUser));

    toast.success('usuario adicionado com sucesso!');
  } catch (err) {
    toast.error('Erro ao salvar usuario, tente novamente.');
  }
}

export function* getUsers({ payload }) {
  try {
    const { page, userSearch } = payload.data;

    const response = yield call(
      api.get,
      `users?_page=${page + 1}&q=${userSearch}&_limit=10`
    );

    const totalItens = response.headers['x-total-count'];
    const users = response.data;

    yield put(getUsersSuccess(users, totalItens));
  } catch (err) {
    toast.error('Erro de conexão, tente mais tarde.');
  }
}

export default all([
  takeLatest('@users/REMOVE_USER_REQUEST', removeUser),
  takeLatest('@users/UPDATE_USER_REQUEST', updateUser),
  takeLatest('@users/SAVE_USER_REQUEST', saveUser),
  takeLatest('@users/GET_USERS_REQUEST', getUsers),
]);
