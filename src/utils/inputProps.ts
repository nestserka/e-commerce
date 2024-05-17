import { getInputProps } from './utils';

export const inputEmailProps = getInputProps('email', 'email', 'Type email address here', 'email');

export const inputPasswordProps = getInputProps('password', 'password', 'Create a strong password', 'off');

export const inputFirstNameProps = getInputProps('firstName', 'firstName', 'Your First Name', 'off');

export const inputLastNameProps = getInputProps('lastName', 'lastName', 'Your Last Name', 'off');

export const inputStreetProps = getInputProps('streetName', 'streetName', 'Street', 'off');

export const inputCityProps = getInputProps('city', 'city', 'City', 'off');

export const inputPostalCodeProps = getInputProps('postal-code', 'postal-code', 'M5V 1J1', 'off');
