import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-wrap justify-center text-center md:justify-between md:text-left">
          <div className="w-full md:w-auto mb-6 md:mb-0 ">
            <a
              href="https://github.com/shubhrocks20"
              className="text-xl hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="inline-block" /> GitHub
            </a>
          </div>
          <div className="w-full md:w-auto mb-6 md:mb-0">
            <a
              href="https://www.linkedin.com/in/shubham-kumar-793399224/"
              className="text-xl hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="inline-block" /> LinkedIn
            </a>
          </div>
          <div className="w-full md:w-auto">
            <a
              href="https://www.instagram.com/shubhambhardwaj2056/"
              className="text-xl hover:text-gray-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="inline-block" /> Instagram
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>
            Made with <span className="text-red-600">♥</span> by Shubham
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
