import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { useSendConfirmationEmailMutation } from '../../app/slices/apiSlice';
import { closeModal } from '../../app/slices/modalSlice';
import Button from '../../common/components/Button/Button';
import { ERROR_MESSAGES } from '../../common/utils/errors';

import styles from './ConfirmEmail.module.scss';

import image from '../../images/ConfirmEmail/confirmed.png';

const SendVerificationEmail: FC = () => {
  const dispatch = useAppDispatch();
  const isRequestSent = useRef(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [requestConfirmationLetter, { isUninitialized, isLoading, isSuccess, isError }] =
    useSendConfirmationEmailMutation();

  useEffect(() => {
    if (isRequestSent.current) return;

    const fetchrequestConfirmationLetter = async () => {
      await requestConfirmationLetter({}).unwrap();
    };

    if (isUninitialized) {
      isRequestSent.current = true;
      fetchrequestConfirmationLetter().catch(() => {
        // Common error
        setErrorMessage(ERROR_MESSAGES.EMAIL_CONFIRMATION_NOT_SENT);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <img src={image} />
      </div>
      {isLoading && <p className={styles.textCentered}>Loading...</p>}
      {isError && errorMessage && (
        <>
          <p className={styles.textCentered}>{errorMessage}</p>
          <Button label="Ok" onClick={() => dispatch(closeModal())} size="small" className={styles.buttonConfirm} />
        </>
      )}
      {isSuccess && (
        <>
          <p className={styles.text}>
            Before creating your user account, please check your email for a&nbsp;confirmation request
          </p>
          <Button label="Ok" onClick={() => dispatch(closeModal())} size="small" className={styles.buttonConfirm} />
        </>
      )}
    </div>
  );
};

export default SendVerificationEmail;
