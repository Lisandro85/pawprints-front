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
    onSubmit: async (values) => {
      console.log("Datos enviados al backend:", values);
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
      <Loader />
      <div className="flex min-h-screen items-center justify-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-1  p-2 justify-center items-center border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90"
        >
          <div className="flex flex-col">
            <div className="flex flex-col text-center">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Your Name"
                className=" border border-black m-2 rounded-lg p-1 text-emerald-300"
              />
              {formik.errors.name && formik.touched.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </div>
            <div className="flex flex-col text-center">
              <label htmlFor="lastName">Apellido</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Your lastName"
                className=" border border-black m-2 rounded-lg text-base p-1 text-emerald-300"
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <div style={{ color: "red" }}>{formik.errors.lastName}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col text-center">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Your Email"
                className=" border border-black m-2 rounded-lg text-base p-1 text-emerald-300"
              />
              {formik.errors.email && formik.touched.email && (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <label htmlFor="birthDate">Fecha de Nacimiento</label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.birthDate}
                placeholder="Your Bithdate"
                className=" border border-black m-2 rounded-lg text-base p-1 text-emerald-300"
              />
              {formik.errors.birthDate && formik.touched.birthDate && (
                <div style={{ color: "red" }}>{formik.errors.birthDate}</div>
              )}
            </div>
          </div>

          <h1>Define tus credenciales:</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Your Username"
              className=" border border-black m-2 rounded-lg p-1 text-emerald-300"
            />
            {formik.errors.username && formik.touched.username && (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Your Password"
              className=" border border-black m-2 rounded-lg text-base p-1 text-emerald-300"
            />
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className=" border border-b-black m-2 p-2 bg-blue-500 rounded-lg  hover:bg-green-400 disabled:bg-gray-600 "
          >
            Registrarse
          </button>
          <p>
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
