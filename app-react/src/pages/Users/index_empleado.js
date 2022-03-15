import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MdEdit, MdDelete } from 'react-icons/md';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {
  getUsersRequest,
  removeUserRequest,
  saveUserRequest,
  updateUserRequest,
} from '~/store/modules/users/actions';

import ConfirmDialog from '~/components/ConfirmDialog';
import { Header, TableAction } from './styles';
import { Card } from '~/components/Card';
import InputSearch from '~/components/InputSearch';
import { Button } from '~/components/DefaultStyle';

import ChangeUserModal from './ChangeUserModal/index_Mempleado';

export default function Empleados() {
  const dispatch = useDispatch();

  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userSelected, setUserSelected] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [page, setPage] = useState(0);

  const users = useSelector(state => state.users.users);
  const userProfile = useSelector(state => state.profile.profile);


  useEffect(() => {
    dispatch(getUsersRequest({ page, userSearch }));
  }, [page, userSearch]); //eslint-disable-line

  useEffect(() => {
    const usersFormatted = users.map(user => ({
      ...user,
      type: user.isVacuna ? 'Vacunado' : 'No Vacunado',
      fullName: `${user.name} ${user.lastName}`,
    }));

    setUsersList(usersFormatted);
  }, [users]);

  function handleEditUser(user) {
    setUserSelected(user);
    const title = 'Editar usuario';
    setModalTitle(title);
    setShowUserModal(true);
  }

  function handleSaveUser(user) {
    setShowUserModal(false);
    if (user.id) {
      dispatch(updateUserRequest(user));
    } else {
      dispatch(saveUserRequest(user));
    }
  }
  function handleRemoveUser(user) {
    dispatch(removeUserRequest(user.id));
    setShowConfirmDialog(false);
    setUserSelected({});
  }
  function handleChangePage(event, newPage) {
    event.preventDefault();
    setPage(newPage);
  }
  return (
    <Card>
      {showUserModal && (
        <ChangeUserModal
          title={modalTitle}
          user={userSelected}
          allowModify={userProfile.isAdmin}
          onCancel={() => setShowUserModal(false)}
          onConfirm={handleSaveUser}
        />
      )}

      <Header>
        <span>usuarios</span>
      </Header>
      <div>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow>
                  <TableCell>{`${userProfile.name}`}</TableCell>
                  <TableCell>{`${userProfile.lastName}`}</TableCell>
                  <TableCell>{`${userProfile.email}`}</TableCell>
                  <TableCell>
                    <TableAction>
                      <button
                        title="Editar usuario"
                        type="button"
                        onClick={() => handleEditUser(userProfile)}
                      >
                        <MdEdit size={18} color="#a2a2a2" />
                      </button>
                    </TableAction>
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
