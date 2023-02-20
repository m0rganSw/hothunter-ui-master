import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';
import { Employer } from 'services/api';
import { modalBoxStyles } from 'shared/ui/theme';

import { EmployerFields, EmployerForm } from './EmployerForm';

type Props = {
  onClose: () => void;
  visible: boolean;
  employer?: Employer;
  submitText?: string;
  onSubmit: (values: EmployerFields) => void;
};

export const EmployerModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <EmployerForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
