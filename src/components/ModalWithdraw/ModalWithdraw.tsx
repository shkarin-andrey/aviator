import { FC, useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface IModalWithdraw {
  balance: number;
}

const ModalWithdraw: FC<IModalWithdraw> = ({ balance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [typeModal, setTypeModal] = useState<'balance' | 'withdraw' | 'accepted'>('balance');

  useEffect(() => {
    if (balance >= 500) {
      setTypeModal('withdraw');
    }

    if (balance < 500) {
      setTypeModal('balance');
    }
  }, [balance]);

  const validationSchema = Yup.object({
    details: Yup.string().trim().required('Введите номер карты или счета'),
    amount: Yup.string()
      .trim()
      .matches(/^\d+$/, 'Поле должно содержать только цифры')
      .test(
        'length',
        (value) => {
          const count = parseInt(value.value, 10);
          if (count > balance) {
            return `Превышен лимит, вам доступно ${balance}$`;
          }
        },
        () => {
          return false;
        },
      )
      .required('Введите сумму вывода'),
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      details: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setTypeModal('accepted');
    },
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelectType = (count: number) => {
    setActive(count);
  };

  const isActive = useCallback(
    (count: number) => {
      if (active === count) {
        return 'bg-[#05F] border-[#05F] text-white';
      }

      return 'border-[#D4D4D8]';
    },
    [active],
  );

  return (
    <>
      <Button onClick={handleOpen} size="s" type="yellow" className="!text-[#7454FD] font-normal normal-case">
        Withdraw
      </Button>
      <Modal isOpen={isOpen} handleClose={handleClose} title={typeModal}>
        {typeModal === 'balance' && (
          <>
            <div className="text-[#515151] text-base w-[250px] text-center mt-5">
              Withdrawal is available if the balance is more than $500
            </div>
            <button
              onClick={handleClose}
              type="submit"
              className="px-4 py-2 bg-[#05F] font-normal text-[14px] mt-5 rounded-md text-white"
            >
              Start earning now
            </button>
          </>
        )}
        {typeModal === 'withdraw' && (
          <>
            <div className="flex mt-5 justify-center">
              <button
                onClick={() => handleSelectType(0)}
                className={`px-3 py-1.5 text-sm uppercase border rounded-none rounded-l-lg ${isActive(0)}`}
              >
                CARD
              </button>
              <button
                onClick={() => handleSelectType(1)}
                className={`px-3 py-1.5 text-sm uppercase border rounded-none rounded-r-lg ${isActive(1)}`}
              >
                USDT
              </button>
            </div>
            <form onSubmit={formik.handleSubmit} className="min-w-[285px]">
              <div className="flex flex-col gap-2 mt-4">
                <Input
                  placeholder="Enter your details"
                  label="Details"
                  className={formik.touched.amount && formik.errors.amount ? 'border-red-500' : ''}
                  {...formik.getFieldProps('details')}
                />

                <Input
                  placeholder="Enter your amount"
                  label="Amount"
                  className={formik.touched.details && formik.errors.details ? 'border-red-500' : ''}
                  {...formik.getFieldProps('amount')}
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#05F] font-normal text-[14px] mt-5 rounded-md text-white"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-transparent font-normal text-[14px] mt-2 rounded-md text-[#006FFD]"
                >
                  Close
                </button>
              </div>
            </form>
          </>
        )}
        {typeModal === 'accepted' && (
          <>
            <div className="text-[#515151] text-base w-[250px] text-center mt-5">
              Your application is being processed, please wait for it to arrive.
            </div>
            <button
              onClick={handleClose}
              type="submit"
              className="px-4 py-2 bg-[#05F] font-normal text-[14px] mt-5 rounded-md text-white"
            >
              Continue earning
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalWithdraw;
