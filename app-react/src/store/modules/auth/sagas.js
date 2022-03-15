import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    if(!user.isAdmin){
      history.push('/empelados');
    }else{
      history.push('/users');
    }

  } catch (err) {
    if (err.status === 400) {
      toast.warn(err.message);
    } else {
      toast.error('La autenticación ha fallado');
    }
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { dni, name, lastName, email, password, fecha_nacimiento, direccion,telefono,isVacuna, isAdmin, active  } = payload;

    yield call(api.post, 'auth/register', {
      dni,
      name,
      lastName,
      email,
      password,
      fecha_nacimiento: '',
      direccion: '',
      telefono: '',
      isVacuna: false,
      isAdmin: false,
      active: true,
    });

    history.push('/');
  } catch (err) {
    if (err.status === 400) {
      toast.warn(err.message);
    } else {
      toast.error('El registro ha fallado');
    }

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
