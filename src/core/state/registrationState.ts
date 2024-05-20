import type { Address } from '../../utils/types';

interface RegistrationState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  billingAddresses: number[];
  shippingAddresses: number[];
}

class RegistrationData {
  private state: RegistrationState;

  constructor() {
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      addresses: [],
      billingAddresses: [],
      shippingAddresses: [],
    };
  }

  setEmail(email: string): void {
    this.state.email = email;
  }

  setFirstName(firstName: string): void {
    this.state.firstName = firstName;
  }

  setLastName(lastName: string): void {
    this.state.lastName = lastName;
  }

  setPassword(password: string): void {
    this.state.password = password;
  }

  setDateOfBirth(dateOfBirth: string): void {
    this.state.dateOfBirth = dateOfBirth;
  }

  addAddress(addresses: Address[]): void {
    this.state.addresses.push(...addresses);
  }

  setDefaultShippingAddress(defaultShippingAddress: number): void {
    this.state.defaultShippingAddress = defaultShippingAddress;
  }

  setDefaultBillingAddress(defaultBillingAddress: number): void {
    this.state.defaultBillingAddress = defaultBillingAddress;
  }

  setBillingAddressIds(billingAddresses: number[]): void {
    this.state.billingAddresses = billingAddresses;
  }

  setShippingAddressIds(shippingAddresses: number[]): void {
    this.state.shippingAddresses = shippingAddresses;
  }

  getState(): RegistrationState {
    return this.state;
  }
}

export default RegistrationData;
