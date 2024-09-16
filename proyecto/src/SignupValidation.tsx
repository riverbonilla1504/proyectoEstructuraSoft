// Function to validate the input values for signup form
function Validation(values: { name: string; email: string; password: string }) {
    // Object to store validation errors
    const errors: { [key: string]: string } = {};

    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Regular expression for validating password format
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // Validate name: should not be empty
    if (values.name.trim() === '') {
        errors.name = 'Name should not be empty';
    }

    // Validate email: should not be empty and must match the email regex
    if (values.email.trim() === '') {
        errors.email = 'Email should not be empty';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    // Validate password: should not be empty and must match the password regex
    if (values.password.trim() === '') {
        errors.password = 'Password should not be empty';
    } else if (!passwordRegex.test(values.password)) {
        errors.password = 'Password should contain at least one digit, one lowercase and one uppercase letter, and be between 6 and 20 characters';
    }

    // Return the errors object
    return errors;
}

// Export the Validation function as the default export
export default Validation;
