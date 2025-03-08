"use client";

import { validationSchemaPost } from "@/validationSchema/validationSchemaPost";
import { useFormik } from "formik";
import React from "react";
import { FcOk } from "react-icons/fc";

const Post = () => {
  const formik = useFormik({
    initialValues: {
      image: null,
      description: "",
    },
    validationSchema: validationSchemaPost,
    onSubmit: async (values) => {
      console.log("Formulario enviado:", values);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    formik.setFieldValue("image", file);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-2 p-4 justify-center items-center border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90"
      >
        <label htmlFor="imagen">Cargar Imagen:</label>
        <div className="flex flex-row items-center">
          <input
            id="imagen"
            type="file"
            accept="image/*"
            className="border border-black m-2 rounded-lg p-1 text-emerald-300 text-xs"
            onChange={handleFileChange}
          />
          {formik.values.image && <FcOk size={28} />}
        </div>
        {formik.errors.image && formik.touched.image && (
          <p className="text-red-500">{formik.errors.image}</p>
        )}
        <label htmlFor="description">Descripción:</label>
        <textarea
          name="description"
          id="description"
          className="border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90 p-2"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        ></textarea>
        {formik.errors.description && formik.touched.description && (
          <p className="text-red-500">{formik.errors.description}</p>
        )}
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className="border border-b-black m-2 py-1 px-10 bg-blue-500 rounded-lg  
                     hover:bg-green-400 disabled:bg-gray-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Post;
