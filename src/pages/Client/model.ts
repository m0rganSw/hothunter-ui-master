import { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { ClientFields } from 'components/ClientsModal/ClientForm';
import { routes } from 'pages/Client/routes';
import { Client } from 'services/api';
import { api } from 'services/api/apiAdapter';
import { useAxiosQuery } from 'shared/hooks/useAxiosQuery';
import { useToggle } from 'shared/hooks/useToggle';

const getClients = async () => {
  const res = await api.clients.clientsGet();

  return res.data;
};
export const useLocalModel = () => {
  const { data: clients, isLoading, request } = useAxiosQuery<Client[]>(getClients);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentClient, setCurrentClient] = useState<Client>();
  const navigate = useNavigate();

  const onSubmitCreate = async (values: ClientFields) => {
    await api.clients.clientsPost({ modifyClientDto: values });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: ClientFields) => {
    await api.clients.clientsIdPut({ id: currentClient!.id, modifyClientDto: values });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const client = clients?.find((item) => item.id === id);
    setCurrentClient(client);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    await api.clients.clientsDeleteIdDelete({ id });
    await request();
  };

  const onItemClick = (id: string) => {
    navigate(generatePath(routes.view, { id }));
  };

  const mappedList = clients?.map(({ name, middleName, surname, receiptNumber, id }) => ({
    info: `${name} ${middleName} ${surname} ${surname} - ${receiptNumber}`,
    id: String(id),
  }));

  return {
    clients,
    createVisible,
    isLoading,
    editVisible,
    mappedList,
    currentClient,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
    onItemClick,
  };
};
