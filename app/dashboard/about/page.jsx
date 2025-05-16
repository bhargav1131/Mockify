"use client";

import React from "react";

function AboutUs() {
  return (
    <div className="p-11 max-w-3xl mx-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
      <h1 className="text-4xl font-extrabold text-primary mb-8">About Us</h1>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Welcome to <strong className="text-primary">Mockify</strong>! We help you get ready for job interviews using AI.
      </p>

      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Mockify was created by <strong className="text-primary">Bhargav</strong> and <strong className="text-primary">Bhrigu</strong>. We are both pursuing Masters in Computer Science at Tezpur University.
      </p>

      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Our goal is to make interview practice simple and effective. Let’s get you ready to succeed!
      </p>

      <div className="text-center border-t border-gray-300 pt-6">
        <h2 className="text-xl font-semibold text-primary mb-3">Contact Us</h2>
        <p className="text-md text-gray-700 mb-2">
          Bhargav:{" "}
          <a
            href="mailto:bhargavsarma173@gmail.com"
            className="text-primary underline hover:text-primary/80 transition"
          >
            bhargavsarma173@gmail.com
          </a>
        </p>
        <p className="text-md text-gray-700">
          Bhrigu:{" "}
          <a
            href="mailto:bhrigubaruahh@gmail.com"
            className="text-primary underline hover:text-primary/80 transition"
          >
            bhrigubaruahh@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
