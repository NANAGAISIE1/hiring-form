"use client";
import Typewriter from "typewriter-effect";

const TypeWriterEffect = ({ strings = [] }) => {
  return (
    <Typewriter
      options={{
        strings: strings,
        autoStart: true,
        loop: true,
        cursor: "",
      }}
    />
  );
};

export default TypeWriterEffect;
