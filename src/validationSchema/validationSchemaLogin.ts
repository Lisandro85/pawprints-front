import * as Yup from "yup";

export const validationSchemaLogin = Yup.object().shape({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
});
