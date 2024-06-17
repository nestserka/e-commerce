import {
  inputBillingCityProps,
  inputBillingPostalCodeProps,
  inputBillingStreetProps,
  inputConfirmPasswordProps,
  inputCurrentPasswordProps,
  inputEmailProps,
  inputFirstNameProps,
  inputLastNameProps,
  inputNewPasswordProps,
  inputPasswordProps,
  inputShippingCityProps,
  inputShippingPostalCodeProps,
  inputShippingStreetProps,
} from '../../utils/inputProps';
import { getInputProps } from '../../utils/utils';

describe('Input props constants', () => {
  it('should match the expected structure and values for inputEmailProps', () => {
    const expectedProps = getInputProps('text', 'email', 'Your email address', 'email');
    expect(inputEmailProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputPasswordProps', () => {
    const expectedProps = getInputProps('password', 'password', 'Create password', 'off');
    expect(inputPasswordProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputFirstNameProps', () => {
    const expectedProps = getInputProps('firstName', 'firstName', 'Your First Name', 'off');
    expect(inputFirstNameProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputLastNameProps', () => {
    const expectedProps = getInputProps('lastName', 'lastName', 'Your Last Name', 'off');
    expect(inputLastNameProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputBillingPostalCodeProps', () => {
    const expectedProps = getInputProps('postal-code', 'billing-postal-code', '42142', 'off');
    expect(inputBillingPostalCodeProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputShippingPostalCodeProps', () => {
    const expectedProps = getInputProps('postal-code', 'shipping-postal-code', '42142', 'off');
    expect(inputShippingPostalCodeProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputBillingCityProps', () => {
    const expectedProps = getInputProps('city', 'billing-city', 'City', 'off');
    expect(inputBillingCityProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputShippingCityProps', () => {
    const expectedProps = getInputProps('city', 'shipping-city', 'City', 'off');
    expect(inputShippingCityProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputShippingStreetProps', () => {
    const expectedProps = getInputProps('streetName', 'shipping-street-name', 'Street', 'off');
    expect(inputShippingStreetProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputBillingStreetProps', () => {
    const expectedProps = getInputProps('streetName', 'billing-street-name', 'Street', 'off');
    expect(inputBillingStreetProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputCurrentPasswordProps', () => {
    const expectedProps = getInputProps('currentPassword', 'currentPassword', 'Enter current password', 'off');
    expect(inputCurrentPasswordProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputNewPasswordProps', () => {
    const expectedProps = getInputProps('newPassword', 'newPassword', 'Enter new password', 'off');
    expect(inputNewPasswordProps).toEqual(expectedProps);
  });

  it('should match the expected structure and values for inputConfirmPasswordProps', () => {
    const expectedProps = getInputProps('confirmPassword', 'confirmPassword', 'Confirm password', 'off');
    expect(inputConfirmPasswordProps).toEqual(expectedProps);
  });
});
