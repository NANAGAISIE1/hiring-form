import Image from "next/image";
import FooterImg from "../../public/footer-img.jpg";
const Footer = () => {
  return (
    <>
      <Image
        src={FooterImg}
        width={1200}
        height={800}
        alt="get hired"
        className="w-full lg:max-w-md"
      />
      <footer className="w-full bg-slate-900 text-white">
        <span>
          {" "}
          &copy; {new Date().getFullYear()} Company Ventures.{" "}
          <br className="md:hidden" />
          All Rights Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;
