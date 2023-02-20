import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Client, JobRequest, ModifyJobRequestDto } from 'services/api';
import { api } from 'services/api/apiAdapter';
import { useAxiosQuery } from 'shared/hooks/useAxiosQuery';
import { useToggle } from 'shared/hooks/useToggle';

const getCurrentClient = async (id: string) => {
  const res = await api.clients.clientsIdGet({ id });

  return res.data;
};

const getClientsJobRequests = async (id: string) => {
  const res = await api.jobRequests.jobRequestClientIdGet({ id });

  return res.data;
};

export const useLocalModel = () => {
  const params = useParams<{ id: string }>();
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentRequest, setCurrentRequest] = useState<JobRequest>();

  const { data: client, isLoading, request } = useAxiosQuery<Client>(getCurrentClient, params.id);

  const {
    data: requests,
    isLoading: isRequestsLoading,
    request: fetchRequests,
  } = useAxiosQuery<JobRequest[]>(getClientsJobRequests, params.id);

  const mappedList = requests?.map(({ positionName, salary, id }) => ({
    info: `${positionName} ${salary}`,
    id: String(id),
  }));

  const onSubmitCreate = async (values: ModifyJobRequestDto) => {
    await api.jobRequests.jobRequestClientIdPost({ id: String(params!.id), modifyJobRequestDto: values });
    toggleCreateVisible();
    await fetchRequests();
  };
  const onSubmitEdit = async (values: ModifyJobRequestDto) => {
    await api.jobRequests.jobRequestIdPut({ id: String(currentRequest!.id), modifyJobRequestDto: values });
    toggleEditVisible();
    await fetchRequests();
  };

  const onEdit = async (id: string) => {
    const request = requests?.find((item) => item.id === id);
    setCurrentRequest(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    await api.jobRequests.jobRequestIdDelete({ id });
    await fetchRequests();
  };

  return {
    isLoading,
    isRequestsLoading,
    createVisible,
    editVisible,
    currentRequest,
    mappedList,
    client,
    toggleCreateVisible,
    toggleEditVisible,
    onEdit,
    onSubmitCreate,
    onDelete,
    onSubmitEdit,
  };
};
