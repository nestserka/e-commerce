import { getInputProps } from './utils';

export const inputEmailProps = getInputProps('text', 'email', 'Your email address', 'email');

export const inputPasswordProps = getInputProps('password', 'password', 'Create password', 'off');

export const inputFirstNameProps = getInputProps('firstName', 'firstName', 'Your First Name', 'off');

export const inputLastNameProps = getInputProps('lastName', 'lastName', 'Your Last Name', 'off');

export const inputBillingPostalCodeProps = getInputProps('postal-code', 'billing-postal-code', '42142', 'off');

export const inputShippingPostalCodeProps = getInputProps('postal-code', 'shipping-postal-code', '42142', 'off');

export const inputBillingCityProps = getInputProps('city', 'billing-city', 'City', 'off');

export const inputShippingCityProps = getInputProps('city', 'shipping-city', 'City', 'off');

export const inputShippingStreetProps = getInputProps('streetName', 'shipping-street-name', 'Street', 'off');

export const inputBillingStreetProps = getInputProps('streetName', 'billing-street-name', 'Street', 'off');

export const inputCurrentPasswordProps = getInputProps(
  'currentPassword',
  'currentPassword',
  'Enter current password',
  'off',
);

export const inputNewPasswordProps = getInputProps('newPassword', 'newPassword', 'Enter new password', 'off');

export const inputConfirmPasswordProps = getInputProps('confirmPassword', 'confirmPassword', 'Confirm password', 'off');
