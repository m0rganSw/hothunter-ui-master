import React, { FC } from 'react';

import { Box, Modal } from '@mui/material';
import { JobRequest } from 'services/api';
import { modalBoxStyles } from 'shared/ui/theme';

import { RequestFields, RequestForm } from './RequestForm';

type Props = {
  onClose: () => void;
  visible: boolean;
  request?: JobRequest;
  submitText?: string;
  onSubmit: (values: RequestFields) => void;
};

export const RequestModal: FC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <RequestForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
