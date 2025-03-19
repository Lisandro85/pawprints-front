import * as Yup from "yup";

export const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "Al menos 8 caracteres")
    .matches(/[A-Z]/, "Al menos una letra mayúscula")
    .matches(/\d/, "Al menos un número")
    .matches(/[@$!%*?&]/, "Al menos un carácter especial (@$!%*?&)"),
});
