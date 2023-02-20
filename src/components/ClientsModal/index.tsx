import React, { FC } from 'react';

import { Box, Modal } from '@mui/material';
import { Client } from 'services/api';
import { modalBoxStyles } from 'shared/ui/theme';

import { ClientFields, ClientForm } from './ClientForm';

type Props = {
  onClose: () => void;
  visible: boolean;
  client?: Client;
  submitText?: string;
  onSubmit: (values: ClientFields) => void;
};

export const ClientModal: FC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <ClientForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
