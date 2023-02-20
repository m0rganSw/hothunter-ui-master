import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';
import { Offer } from 'services/api';
import { modalBoxStyles } from 'shared/ui/theme';

import { OfferFields, OfferForm } from './OfferForm';

type Props = {
  onClose: () => void;
  visible: boolean;
  offer?: Offer;
  submitText?: string;
  onSubmit: (values: OfferFields) => void;
};

export const OfferModal: VFC<Props> = (props) => {
  return (
    <Modal open={props.visible}>
      <Box sx={modalBoxStyles}>
        <OfferForm title="Создать пользователя" onCancel={props.onClose} {...props} />
      </Box>
    </Modal>
  );
};
