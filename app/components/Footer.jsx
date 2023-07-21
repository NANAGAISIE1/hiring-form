import Image from "next/image";
import FooterImg from "../../public/footer-img.jpg";
const Footer = () => {
  return (
    <>
      <Image
        src={FooterImg}
        width={1200}
        height={800}
        placeholder="blur"
        alt="get hired"
        className="w-full "
      />
      <footer className="w-full bg-black/95 text-white border-t-2 border-white">
        <span className="justify-center text-sm p-1 w-full flex">
          {" "}
          &copy; {new Date().getFullYear()} Company Ventures. All Rights
          Reserved.
        </span>
      </footer>
    </>
  );
};

export default Footer;
