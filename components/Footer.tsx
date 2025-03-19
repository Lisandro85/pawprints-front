import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineContactPage } from "react-icons/md";

const Footer = () => {
  return (
    <div className="flex flex-row p-4 justify-center items-center text-3xl bg-blue-600 mt-20">
      <footer className="text-center flex flex-row items-center justify-center gap-5">
        <Link
          href="mailto:huellitaspawprints@gmail.com"
          target="_blank"
          className="text-base justify-center hover:bg-green-400 p-1 rounded-lg"
        >
          <MdAlternateEmail size={20} title="Email" />
        </Link>
        <Link
          href="https://github.com/Lisandro85"
          target="_blank"
          className="text-base justify-center hover:bg-green-400 p-1 rounded-lg"
        >
          <FaGithub size={20} title="GitHub" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/lisandro-bedotti"
          target="_blank"
          className="text-base justify-center hover:bg-green-400 p-1 rounded-lg"
        >
          <FaLinkedin size={20} title="Linkedin" />
        </Link>
        <Link
          href="https://bedottiwebsite.vercel.app"
          target="_blank"
          className="text-base justify-center hover:bg-green-400 p-1 rounded-lg"
        >
          <MdOutlineContactPage size={20} title="Portfolio" />
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
