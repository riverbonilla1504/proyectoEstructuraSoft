function Validation(values: any) {
  let errors: any = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  // Email validation
  if (!values.email) {
    errors.email = 'Email cannot be empty';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!values.password) {
    errors.password = 'Password cannot be empty';
  } else if (!passwordRegex.test(values.password)) {
    errors.password = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be between 6 and 20 characters long';
  }

  return errors;
}

export default Validation;
