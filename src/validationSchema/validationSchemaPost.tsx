import * as Yup from "yup";

export const validationSchemaPost = Yup.object().shape({
  image: Yup.mixed()
    .required("La imagen es obligatoria")
    .test(
      "fileType",
      "El archivo debe ser una imagen (JPG, PNG, GIF)",
      (value) => {
        if (!value) return false;
        return (
          value instanceof File &&
          ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        );
      }
    ),
  description: Yup.string().required("La descripción es obligatoria"),
  adress: Yup.string().required("La dirección es obligatoria"),
});
