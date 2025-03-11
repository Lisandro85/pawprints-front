"use client";
import React from "react";
import Loader from "../../../components/Loadder";
import { useSession } from "next-auth/react";

const About = () => {
  const { status } = useSession();
  return (
    <>
      {status === "loading" && <Loader />}
      <div>About</div>
    </>
  );
};

export default About;
