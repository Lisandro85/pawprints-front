import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
  name: Yup.string().required("Requerido"),
  lastName: Yup.string().required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  birthDate: Yup.date().required("Requerido"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
