"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { PrismaClient } from "@prisma/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interface for form data
interface FormData {
  name: string;
  email: string;
}

export default function Hero() {
  // State hooks with TypeScript for input values
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const successToast = (name: string) => {
    toast.success(`Welcome ${name}`, {
      position: "top-right",
    });
  };
  const errorToast = () => {
    toast.error("Error adding contact", {
      position: "top-right",
    });
  };
  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const name = form.get("name");
    const email = form.get("email");
    console.log(name, email, "name email");

    const response = await fetch("/api/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      console.log("Contact added successfully");
      successToast(name);
      // Handle success
    } else {
      console.error("Error adding contact");
      errorToast();
      // Handle error
    }
  };

  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Get to know other fellow{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                campers
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Campers lets you interact with the travellers that share the
                campsite with you. Make your journey more connected, more human,
                more engaged.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <form
                  className="flex flex-col sm:flex-row"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col sm:flex-row">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="border border-gray-300 rounded-md px-4 py-2 mb-2 sm:mr-2"
                      value={formData.name}
                      onChange={handleChange} // Update state on change
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border border-gray-300 rounded-md px-4 py-2 mb-2 sm:ml-2"
                      value={formData.email}
                      onChange={handleChange} // Update state on change
                    />
                  </div>
                  <button
                    // disabled={!formData.name || !formData.email}
                    type="submit"
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full sm:w-auto sm:ml-4 sm:px-4 sm:py-2 h-10"
                  >
                    I want to know more
                  </button>
                </form>
                <div className="text-sm text-gray-500 mt-2">
                  We respect your privacy. Your name and email will only be used
                  to send you updates.
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>

          {/* Hero image */}

          <img
            src="/images/pexels-main.jpeg"
            alt="Hero image"
            data-aos="zoom-y-out"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
