import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { OfferFields } from 'components/OffersModal/OfferForm';
import { Employer, ModifyOfferDto, Offer } from 'services/api';
import { api } from 'services/api/apiAdapter';
import { useAxiosQuery } from 'shared/hooks/useAxiosQuery';
import { useToggle } from 'shared/hooks/useToggle';

const getEmployerById = async (id: string) => {
  const res = await api.employers.employersIdGet({ id });

  return res.data;
};

const getOffersEmployerById = async (id: string) => {
  const res = await api.offers.offersEmployerIdGet({ id });

  return res.data;
};

export const useLocalModel = () => {
  const params = useParams<{ id: string }>();
  const { data: employer, isLoading, request } = useAxiosQuery<Employer>(getEmployerById, params.id);

  const {
    data: offers,
    isLoading: isOffersLoading,
    request: fetchOffers,
  } = useAxiosQuery<Offer[]>(getOffersEmployerById, params.id);

  const [createVisible, toggleCreateVisible] = useToggle();
  const [editVisible, toggleEditVisible] = useToggle();
  const [currentOffer, setCurrentOffer] = useState<Offer>();

  const mappedList = offers?.map(({ positionName, gender, salary, id }) => ({
    info: `Должность: ${positionName}, зарплата: ${salary}, гендер: ${gender}`,
    id: String(id),
  }));

  const onSubmitCreate = async (values: OfferFields) => {
    await api.offers.offersEmployerIdPost({
      id: String(params!.id),
      modifyOfferDto: { positionName: values.positionName, gender: values.gender, salary: values.salary },
    });
    toggleCreateVisible();
    await fetchOffers();
  };
  const onSubmitEdit = async (values: OfferFields) => {
    await api.offers.offersIdPut({
      id: String(currentOffer!.id),
      modifyOfferDto: { positionName: values.positionName, gender: values.gender, salary: values.salary },
    });
    toggleEditVisible();
    await fetchOffers();
  };

  const onEdit = async (id: string) => {
    const request = offers?.find((item) => item.id === id);
    setCurrentOffer(request);
    toggleEditVisible();
  };
  const onDelete = async (id: string) => {
    await api.offers.offersIdDelete({ id });
    await fetchOffers();
  };

  return {
    employer,
    mappedList,
    createVisible,
    editVisible,
    currentOffer,
    isLoading,
    isOffersLoading,
    toggleCreateVisible,
    toggleEditVisible,
    onSubmitCreate,
    onSubmitEdit,
    onEdit,
    onDelete,
  };
};
