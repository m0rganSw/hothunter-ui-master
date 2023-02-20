import React from 'react';

import { ClientModal } from 'components/ClientsModal';
import { Loader } from 'shared/ui/Loader';
import { ItemsList } from 'widgets/ItemsList';

import { useLocalModel } from './model';

export const ClientsList = () => {
  const {
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
  } = useLocalModel();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ItemsList
        data={mappedList ?? []}
        title={'Клиенты'}
        onDeleteItem={onDelete}
        onEditItem={onEdit}
        onCreate={toggleCreateVisible}
        onItemClick={onItemClick}
      />
      <ClientModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate} />
      <ClientModal
        visible={editVisible}
        onClose={toggleEditVisible}
        onSubmit={onSubmitEdit}
        client={currentClient}
        submitText={'Сохранить'}
      />
    </>
  );
};
