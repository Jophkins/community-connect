import classNames from 'classnames';
import { FC } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import Button from '../../common/components/Button/Button';
import Input from '../../common/components/Input/Input';
import {
  NAME_REGEX,
  ERROR_MESSAGE_NAME,
  EMAIL_REGEX,
  ERROR_MESSAGE_EMAIL,
  PASS_REGEX,
  ERROR_MESSAGE_PASSWORD,
  ERROR_MESSAGE_REPASSWORD,
} from '../../common/utils/formComponentsUtils';

import styles from './RegisterForm.module.scss';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  agreement: string;
}

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const firstName = register('firstName', {
    required: 'First name is required',
    pattern: {
      value: NAME_REGEX,
      message: ERROR_MESSAGE_NAME,
    },
  });

  const lastName = register('lastName', {
    required: 'Last name is required',
    pattern: {
      value: NAME_REGEX,
      message: ERROR_MESSAGE_NAME,
    },
  });

  const email = register('email', {
    required: 'Email is required',
    pattern: {
      value: EMAIL_REGEX,
      message: ERROR_MESSAGE_EMAIL,
    },
  });

  const password = register('password', {
    required: 'Password is required',
    pattern: {
      value: PASS_REGEX,
      message: ERROR_MESSAGE_PASSWORD,
    },
  });

  const rePassword = register('rePassword', {
    required: 'Re-enter password is required',
    pattern: {
      value: PASS_REGEX,
      message: ERROR_MESSAGE_REPASSWORD,
    },
  });

  // TODO: send data to the API
  const onSubmit: SubmitHandler<IFormInput> = async (values) => {
    console.log(JSON.stringify(values, undefined, 2));
  };

  return (
    <form className={styles.form}>
      <div className={styles.formRow}>
        <Input
          name={firstName.name}
          label="First name"
          autoComplete="on"
          className={styles.formField}
          onChange={firstName.onChange}
          onBlur={firstName.onBlur}
          ref={firstName.ref}
          errorMessage={errors.firstName?.message}
        />
        <Input
          name={lastName.name}
          label="Last name"
          autoComplete="on"
          className={styles.formField}
          onChange={lastName.onChange}
          onBlur={lastName.onBlur}
          ref={lastName.ref}
          errorMessage={errors.lastName?.message}
        />
      </div>
      <div className={styles.formRow}>
        <Input
          name={email.name}
          label="Email"
          type="email"
          autoComplete="on"
          className={styles.formField}
          onChange={email.onChange}
          onBlur={email.onBlur}
          ref={email.ref}
          errorMessage={errors.email?.message}
        />
      </div>
      <div className={classNames(styles.formRow, (errors.password || errors.rePassword) && styles.error)}>
        <Input
          name={password.name}
          label="Password"
          type="password"
          className={styles.formField}
          onChange={password.onChange}
          onBlur={password.onBlur}
          ref={password.ref}
          errorMessage={errors.password?.message}
        />
        <Input
          name={rePassword.name}
          label="Re-enter Password"
          type="password"
          className={styles.formField}
          onChange={rePassword.onChange}
          onBlur={rePassword.onBlur}
          ref={rePassword.ref}
          errorMessage={errors.rePassword?.message}
        />
      </div>

      <div className={classNames(styles.formRow, (errors.password || errors.rePassword) && styles.errorCheckbox)}>
        <fieldset className={styles.checkboxField}>
          <Controller
            name="agreement"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field, fieldState }) => (
              <input
                type="checkbox"
                {...field}
                className={classNames(styles.checkbox, fieldState.error && styles.error)}
              />
            )}
          />
          <label htmlFor="agreement">
            <span>Do&nbsp;you agree to&nbsp;our </span>
            <a href="#">Terms and Conditions, Privacy Statement, and Security Policy</a>
          </label>
        </fieldset>
      </div>

      <div className={styles.formButton}>
        <Button label="Sign Up" isSubmit onClick={handleSubmit(onSubmit)} size="small" />
      </div>
      <p className={styles.formBottomText}>
        <span>Already have an account? </span>
        <a href="#" className={styles.formBottomLink}>
          Sign&nbsp;in&nbsp;now
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
