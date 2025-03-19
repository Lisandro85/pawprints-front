import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es Requerido")
    .matches(/^[A-Za-z]+$/, "El nombre no debe contener números ni espacios"),
  lastName: Yup.string()
    .required("El apellido Requerido")
    .matches(/^[A-Za-z]+$/, "El apellido no debe contener números ni espacios"),
  email: Yup.string().email("Email inválido").required("El email es Requerido"),
  birthDate: Yup.date().required("La Fecha es Requerida"),
  username: Yup.string().required("El Username es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "Al menos 8 caracteres")
    .matches(/[A-Z]/, "Al menos una letra mayúscula")
    .matches(/\d/, "Al menos un número")
    .matches(/[@$!%*?&]/, "Al menos un carácter especial (@$!%*?&)"),
});
