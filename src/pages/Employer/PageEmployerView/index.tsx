import React from 'react';

import Box from '@mui/material/Box';
import { ownershipTypeNameMap } from 'components/EmployerModal/EmployerForm';
import { OfferModal } from 'components/OffersModal';
import { Loader } from 'shared/ui/Loader';
import { ItemsList } from 'widgets/ItemsList';

import { useLocalModel } from './model';

export const ClientView = () => {
  const {
    employer,
    mappedList,
    currentOffer,
    editVisible,
    createVisible,
    isLoading,
    isOffersLoading,
    toggleCreateVisible,
    toggleEditVisible,
    onEdit,
    onSubmitCreate,
    onSubmitEdit,
    onDelete,
  } = useLocalModel();

  if (isLoading || isOffersLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Предложения работодателя {`${employer?.name} `}</h1>
      <Box borderRadius="8px" border={'1px solid gray'} padding={'10px'} display="flex" flexDirection="column">
        <h2>Информация о работодателя</h2>
        <div>{`Тип собственности: ${
          employer?.ownerShipType ? ownershipTypeNameMap[employer?.ownerShipType] : ''
        } `}</div>
        <div>{`Адрес: ${employer?.address} `}</div>
        <div>{`Телефон: ${employer?.phone} `}</div>
        <div>{`Номер регистрации: ${employer?.registryNumber} `}</div>
      </Box>
      <ItemsList
        data={mappedList ?? []}
        title={'Предложения'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
      />
      <OfferModal onClose={toggleCreateVisible} onSubmit={onSubmitCreate} visible={createVisible} />
      <OfferModal
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        visible={editVisible}
        offer={currentOffer}
        submitText={'Сохранить'}
      />
    </>
  );
};
