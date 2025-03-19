"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Loadder";
import { useFormik } from "formik";
import { validationSchemaRegister } from "@/validationSchema/validationSchemaRegister";
import Link from "next/link";

function Register() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      Swal.fire({
        title: "Ya te encuentras registrado",
        icon: "warning",
      });
      router.push("/");
    }
  }, [session, status, router]);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      birthDate: "",
      username: "",
      password: "",
    },
    validationSchema: validationSchemaRegister,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        Swal.fire({
          title: "Usuario creado con exito",
          icon: "success",
        });
        router.push("/login");
      } catch (error) {
        Swal.fire({
          title: (error as Error).message,
          icon: "warning",
        });
      }
    },
  });

  return (
    <div>
      {status === "loading" && <Loader />}
      <div className="flex  items-center justify-center mb-5 ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-1  p-2 items-center border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90"
        >
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col text-center">
              <label htmlFor="name" className="text-xs text-center">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Your Name"
                className=" border border-black m-2 rounded-lg p-1 text-emerald-300 text-xs"
              />

              {formik.errors.name && formik.touched.name && (
                <div className="text-xs text-amber-400">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="lastName" className="text-xs text-center">
                Apellido
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                placeholder="Your lastName"
                className=" border border-black m-2 rounded-lg  p-1 text-emerald-300 text-xs"
              />

              {formik.errors.lastName && formik.touched.lastName && (
                <div className="text-xs text-amber-400">
                  {formik.errors.lastName}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col text-center items-left">
              <label htmlFor="email" className="text-xs text-center">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Your Email"
                className=" border border-black m-2 rounded-lg  p-1 text-emerald-300 text-xs w-52"
              />

              {formik.errors.email && formik.touched.email && (
                <div className="text-xs text-amber-400">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <label htmlFor="birthDate" className="text-xs text-center">
                Fecha de Nacimiento
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                placeholder="Your Bithdate"
                className=" border border-black m-2 rounded-lg p-1 text-emerald-300 text-xs"
              />

              {formik.errors.birthDate && formik.touched.birthDate && (
                <div className="text-xs text-amber-400">
                  {formik.errors.birthDate}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row items-center">
            <label htmlFor="username" className="text-xs">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Your Username"
              className=" border border-black m-2 rounded-lg p-1 text-emerald-300 text-xs"
            />
          </div>
          {formik.errors.username && formik.touched.username && (
            <div className="text-xs text-amber-400">
              {formik.errors.username}
            </div>
          )}
          <div className="flex flex-row items-center">
            <label htmlFor="password" className="text-xs">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched("password", true, false);
                formik.validateField("password");
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Your Password"
              className=" border border-black m-2 rounded-lg  p-1 text-emerald-300 text-xs"
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="text-xs text-amber-400">
              {formik.errors.password}
            </div>
          )}
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className=" border border-b-black m-2 py-1 px-2 bg-blue-500 rounded-lg  hover:bg-green-400 disabled:bg-gray-600 "
          >
            Registrarse
          </button>
          <p className="text-xs">
            Ya tienes una cuenta??{" "}
            <Link className="text-emerald-300" href="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
