import style from './_registrationForm.module.scss';
// import Input from '../../../components/ui/input/input';
// import InputCheckBox from '../../../components/ui/checkbox/checkbox';
import FormTitle from '../../../components/formTitle/FormTitle';
// import { useLoginData } from '../../../core/state/loginState';
// import FormSubTitle from '../../../components/formSubTitle/formSubTitle';

export default function RegistrationForm(): JSX.Element {
  // const { setValueEmail, setValuePassword } = useLoginData();

  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setValueEmail(e.target.value);
  // };

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   setValuePassword(e.target.value);
  // };

  // const options = [
  //   'USA', 'Canada'
  // ];

  return (
    <form className={style['registration-form']} data-testid="registration">
      <FormTitle title="Register" />
      {/* <div className={style['form-group']}> <Input
        type="email"
        id="email"
        name="email"
        placeholder="Type email address here"
        label="Email "
        autocomplete="email"
        onChange={handleEmailChange}
      />
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="Create a strong password"
        label="Password "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
       <FormSubTitle subTitle="Personal Info" />
       <div className={style['form-group']}> <Input
        type="firstName"
        id="firstName"
        name="firstName"
        placeholder="Your First Name"
        label="First Name "
        autocomplete="firstName"
        onChange={handleEmailChange}
      />
      <Input
        type="lastName"
        id="lastName"
        name="lastName"
        placeholder="Your Last Name"
        label="Last Name "
        autocomplete="lastName"
        onChange={handlePasswordChange}
      />
       <Input
        type="calendar"
        id="calendar"
        name="calendar"
        placeholder="01.01.1990"
        label="Date of Birth "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
        <FormSubTitle subTitle="Main Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>    
      <InputCheckBox
        id="default"
        name="default"
        label="Set as default address for shipping & billing "
        onChange={handlePasswordChange}
      />
        <FormSubTitle subTitle="Shipping Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
          <InputCheckBox
        id="default"
        name="default"
        label="Set as billing address "
        onChange={handlePasswordChange}
      />
        <FormSubTitle subTitle="Billing Address" />
        <div className={style['form-group']}> <Input
        type="street"
        id="street"
        name="street"
        placeholder="Street "
        label="Street "
        autocomplete="street"
        onChange={handleEmailChange}
      />
      <Input
        type="city"
        id="city"
        name="city"
        placeholder="City"
        label="City "
        autocomplete="city"
        onChange={handlePasswordChange}
      />
       <Input
        type="postal-code"
        id="postal-code"
        name="postal-code"
        placeholder="123 456"
        label="Postal Code "
        autocomplete="off"
        onChange={handlePasswordChange}
      />
        <Input
        type="country"
        id="country"
        name="country"
        placeholder="Select Country"
        label="Country "
        autocomplete="off"
        onChange={handlePasswordChange}
      /></div>
        <InputCheckBox
        id="default"
        name="default"
        label="Set as shipping address "
        onChange={handlePasswordChange}
      /> */}

      <button type="submit">Create Your Account</button>
      <section>
        <p>Already have an account?</p>
        <p>Login</p>
      </section>
    </form>
  );
}