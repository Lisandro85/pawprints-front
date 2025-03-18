"use client";

import { validationSchemaPost } from "@/validationSchema/validationSchemaPost";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcOk } from "react-icons/fc";
import Swal from "sweetalert2";
import Loader from "../../../components/Loadder";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../../../components/MapView"), {
  ssr: false,
});

const Post = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user.id) {
      formik.setFieldValue("userId", session.user.id);
    }
  }, [session]);

  const formik = useFormik({
    initialValues: {
      image: null,
      description: "",
      userId: session?.user.id,
      adress: address || "",
    },
    validationSchema: validationSchemaPost,
    onSubmit: async (values) => {
      if (!values.image) {
        alert("Debes seleccionar una imagen.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", values.image);
        formData.append("description", values.description);
        formData.append("adress", values.adress);
        if (values.userId) {
          formData.append("userId", values.userId);
        } else {
          console.error("El userId no está disponible");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/image`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        console.log(result);
        Swal.fire({
          title: "Imagen Cargada con Exito",
          icon: "success",
        });
        router.push("/lost");
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen");
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    formik.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    formik.setFieldValue("adress", newAddress);
  };

  return (
    <>
      {status === "loading" && <Loader />}
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
              capture="environment"
              onChange={handleFileChange}
            />
            {formik.values.image && <FcOk size={28} />}
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded-lg"
            />
          )}
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500">{formik.errors.image}</p>
          )}
          <label htmlFor="description">Descripción:</label>
          <textarea
            name="description"
            id="description"
            className="border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90 p-2 text-xs w-64 h-auto break-words whitespace-normal"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
          <label htmlFor="adress">Dirección:</label>

          <textarea
            name="adress"
            id="adress"
            className="border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90 p-2 text-xs w-64 h-auto break-words whitespace-normal"
            value={formik.values.adress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.adress && formik.touched.adress && (
            <p className="text-red-500">{formik.errors.adress}</p>
          )}
          <div className="m-2 ">
            <MapView onAddressChange={handleAddressChange} />{" "}
          </div>

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
    </>
  );
};

export default Post;
