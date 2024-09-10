function Validation(values: any) {
  let errors: any = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (values.email === '') {
    errors.email = 'Email should not be empty';
  }
  else if (!emailRegex.test(values.email)) {
    errors.email = 'email did not match';
  }
  else {
    errors.email = '';
  }

  if (values.password === '') {
    errors.password = 'Password should not be empty';
  }
  else if (!passwordRegex.test(values.password)) {
    errors.password = 'Password should contain at least one digit, one lowercase and one uppercase letter, and at least 6 characters';
  }
  else {
    errors.password = '';
  }
  return errors;
}
export default Validation;