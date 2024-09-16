function Validation(values: any) {
  // Initialize an empty object to store errors
  let errors: any = {};

  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Regular expression for validating password format
  // Password must contain at least one digit, one lowercase letter, one uppercase letter, and be between 6 and 20 characters long
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  // Email validation
  if (!values.email) {
    // Check if email is empty
    errors.email = 'Email cannot be empty';
  } else if (!emailRegex.test(values.email)) {
    // Check if email format is invalid
    errors.email = 'Invalid email format';
  }

  // Password validation
  if (!values.password) {
    // Check if password is empty
    errors.password = 'Password cannot be empty';
  } else if (!passwordRegex.test(values.password)) {
    // Check if password format is invalid
    errors.password = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be between 6 and 20 characters long';
  }

  // Return the errors object
  return errors;
}

// Export the Validation function as the default export
export default Validation;
