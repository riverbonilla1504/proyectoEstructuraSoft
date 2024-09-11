function Validation(values: { name: string; email: string; password: string }) {
    const errors: { [key: string]: string } = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  
    if (values.name.trim() === '') {
        errors.name = 'Name should not be empty';
    }

    if (values.email.trim() === '') {
        errors.email = 'Email should not be empty';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    if (values.password.trim() === '') {
        errors.password = 'Password should not be empty';
    } else if (!passwordRegex.test(values.password)) {
        errors.password = 'Password should contain at least one digit, one lowercase and one uppercase letter, and be between 6 and 20 characters';
    }

    return errors;
}

export default Validation;
