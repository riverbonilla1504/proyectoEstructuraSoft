function Validation(values: any) {
  let errors: any = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  // Validación del email
  if (!values.email) {
    errors.email = 'El email no puede estar vacío';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'El formato del email es incorrecto';
  }

  // Validación de la contraseña
  if (!values.password) {
    errors.password = 'La contraseña no puede estar vacía';
  } else if (!passwordRegex.test(values.password)) {
    errors.password = 'La contraseña debe tener al menos un dígito, una letra minúscula, una mayúscula y entre 6 y 20 caracteres';
  }

  return errors;
}

export default Validation;
