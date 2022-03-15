import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Users from '~/pages/Users/index';
import Empleados from '~/pages/Users/index_empleado';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />

      <Route path="/users" exact component={Users} isPrivate />

      <Route path="/empleados" exact component={Empleados} isPrivate />

      <Route path="/*" component={() => <Redirect to="/users" />} />
    </Switch>
  );
}
