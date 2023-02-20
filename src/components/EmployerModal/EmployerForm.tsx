import React from 'react';

import { Controller, useForm } from 'react-hook-form';
import ReactInputMask from 'react-input-mask';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Employer, ModifyEmployerDto, OwnerShipType } from 'services/api';
import { Select } from 'shared/ui/Select';

export type EmployerFields = Omit<ModifyEmployerDto, 'ownerShipType'> & {
  ownerShipType: {
    value: number;
    label: string;
  };
};
interface UserFormProps {
  title: string;
  onSubmit: (values: EmployerFields) => void;
  onCancel: () => void;
  employer?: Employer;
  submitText?: string;
}

export const ownershipTypeNameMap: Record<OwnerShipType, string> = {
  [OwnerShipType.NUMBER_0]: 'ООО',
  [OwnerShipType.NUMBER_1]: 'ЗАО',
  [OwnerShipType.NUMBER_2]: 'ИП',
};

export const EmployerForm: React.FC<UserFormProps> = ({
  title,
  employer,
  onSubmit,
  submitText = 'Создать',
  onCancel,
}) => {
  const methods = useForm<EmployerFields>({
    defaultValues: {
      ...employer,
      ownerShipType:
        employer?.ownerShipType !== undefined
          ? {
              value: employer?.ownerShipType,
              label: ownershipTypeNameMap[employer.ownerShipType],
            }
          : undefined,
    },
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} title={title}>
      <Stack spacing={2} width={'100%'}>
        <TextField {...methods.register('name')} label="Имя" />
        <TextField {...methods.register('registryNumber')} label="Номер регистрации" type={'number'} />
        <TextField {...methods.register('address')} label="Адрес" />
        <ReactInputMask
          {...methods.register('phone')}
          placeholder="+7 (___) ___-__-__"
          defaultValue={employer?.phone}
          mask="+7 (999) 999-99-99"
        >
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (inputProps) => (
              <TextField label="Телефон" type="text" defaultValue={employer?.phone} fullWidth {...inputProps} />
            )
          }
        </ReactInputMask>
        <InputLabel>Тип собственности</InputLabel>
        <Controller
          render={({ field }) => {
            return (
              <Select
                {...field}
                options={[
                  { label: 'ООО', value: OwnerShipType.NUMBER_0 },
                  { label: 'ЗАО', value: OwnerShipType.NUMBER_1 },
                  { label: 'IP', value: OwnerShipType.NUMBER_2 },
                ]}
              />
            );
          }}
          name={'ownerShipType'}
          control={methods.control}
        />

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
