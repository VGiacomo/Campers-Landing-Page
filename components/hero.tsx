"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";

// Define interface for form data
interface FormData {
  name: string;
  email: string;
}

export default function Hero() {
  // State hooks with TypeScript for input values
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        console.log("Submission successful");
        // Optionally reset form or give user feedback
        setFormData({ name: "", email: "" });
      } else {
        console.error("Submission failed");
        // Handle server errors or invalid responses
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle network errors
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
          </div>

          {/* Hero image */}

          <img
            src="/images/pexels-andrea-piacquadio.jpg"
            alt="Hero image"
            data-aos="zoom-y-out"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
