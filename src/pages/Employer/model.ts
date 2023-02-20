import { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { EmployerFields, ownershipTypeNameMap } from 'components/EmployerModal/EmployerForm';
import { routes } from 'pages/Employer/routes';
import { Employer, OwnerShipType } from 'services/api';
import { api } from 'services/api/apiAdapter';
import { useAxiosQuery } from 'shared/hooks/useAxiosQuery';
import { useToggle } from 'shared/hooks/useToggle';

const getEmployers = async () => {
  const res = await api.employers.employersGet();

  return res.data;
};

export const useLocalModel = () => {
  const { data: employers, isLoading, request } = useAxiosQuery<Employer[]>(getEmployers);
  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentEmployer, setCurrentEmployer] = useState<Employer>();

  const navigate = useNavigate();
  const onSubmitCreate = async (values: EmployerFields) => {
    await api.employers.employersPost({
      modifyEmployerDto: { ...values, ownerShipType: values.ownerShipType.value as OwnerShipType },
    });
    toggleCreateVisible();
    await request();
  };

  const onSubmitEdit = async (values: EmployerFields) => {
    await api.employers.employersIdPut({
      id: currentEmployer!.id,
      modifyEmployerDto: { ...values, ownerShipType: values.ownerShipType.value as OwnerShipType },
    });
    toggleEditVisible();
    await request();
  };

  const onEdit = async (id: string) => {
    const employer = employers?.find((item) => item.id === id);
    setCurrentEmployer(employer);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    await api.employers.employersDeleteIdDelete({ id });
    await request();
  };

  const onItemClick = (id: string) => {
    navigate(generatePath(routes.view, { id }));
  };

  const mappedList = employers?.map(({ name, address, ownerShipType, phone, registryNumber, id }) => ({
    info: `[${ownershipTypeNameMap[ownerShipType]}] Название: ${name}, Адрес: ${address}, Телефон: ${phone} - ${registryNumber}`,
    id: String(id),
  }));

  return {
    mappedList,
    currentEmployer,
    isLoading,
    createVisible,
    editVisible,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
    onItemClick,
  };
};
