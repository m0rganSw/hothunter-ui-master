import { FC } from 'react';

import { useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Client, ModifyClientDto } from 'services/api';

export type ClientFields = ModifyClientDto;

interface Props {
  title: string;
  onSubmit: (values: ClientFields) => void;
  onCancel: () => void;
  client?: Client;
  submitText?: string;
}

export const ClientForm: FC<Props> = ({ title, client, onSubmit, submitText = 'Создать', onCancel }) => {
  const methods = useForm<ClientFields>({
    defaultValues: client,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('surname')} label="Фамилия" />
        <TextField {...methods.register('name')} label="Имя" />
        <TextField {...methods.register('middleName')} label="Отчество" />
        <TextField {...methods.register('registryNumber')} label="Номер регистрации" type="number" />
        <TextField {...methods.register('address')} label="Адрес" />
        <TextField {...methods.register('gender')} label="Гендер" />
        <TextField {...methods.register('receiptNumber')} label="Номер договора" />
        <ReactInputMask
          {...methods.register('phone')}
          placeholder="+7 (___) ___-__-__"
          defaultValue={client?.phone}
          mask="+7 (999) 999-99-99"
        >
          {
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            (inputProps) => (
              <TextField label="Телефон" type="text" defaultValue={client?.phone} fullWidth {...inputProps} />
            )
          }
        </ReactInputMask>
        <Stack direction={'row'} justifyContent={'end'} spacing={2} width={'100%'}>
          <Button type={'reset'} variant={'contained'} color={'primary'} onClick={onCancel}>
            Отмена
          </Button>
          <Button type={'submit'} variant={'contained'} color={'secondary'}>
            {submitText}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
