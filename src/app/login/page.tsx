"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { validationSchemaLogin } from "../../validationSchema/validationSchemaLogin";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "../../../components/Loadder";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,

    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });
      if (res?.error) {
        Swal.fire({
          title: res.error,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Usuario Logueado con Exito",
          icon: "success",
        });
        router.push("/");
      }
    },
  });

  return (
    <div>
      <Loader />
      <div className="flex min-h-screen items-center justify-center ">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4  p-2 justify-center items-center border border-gray-800 rounded-lg shadow-2xl bg-gray-500 opacity-90"
        >
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
            Login
          </button>
          <p>
            Todavia no estas registrado?{" "}
            <Link className="text-emerald-300" href="/register">
              Registrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
