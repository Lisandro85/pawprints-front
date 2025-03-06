"use client";
import React from "react";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { validationSchemaLogin } from "../../validationSchema/validationSchemaLogin";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
  const router = useRouter();
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
      <div className="flex min-h-screen items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4  p-2 justify-center items-center border border-gray-800 rounded-lg shadow-2xl"
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
              className=" border border-b-black m-2 rounded-lg p-1"
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
              className=" border border-b-black m-2 rounded-lg text-base p-1"
            />
            {formik.errors.password && formik.touched.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className=" border border-b-black m-2 p-2 bg-blue-500 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
