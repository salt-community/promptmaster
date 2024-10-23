import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export type NewPost = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
};

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phonenumber: "",
  });
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [postErrorDisplay, setPostErrorDisplay] = useState(false);

  const {
    mutate: postForm,
    error: postError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(`${baseURL}/promptmaster/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      setFormData({
        name: "",
        company: "",
        role: "",
        email: "",
        phonenumber: "",
      });
    },
  });

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    postForm({
      name: formData.name,
      company: formData.company,
      role: formData.role,
      email: formData.email,
      phone: formData.phonenumber,
    });
  }

  useEffect(() => {
    if (postError) {
      setPostErrorDisplay(true);
      setTimeout(() => {
        setPostErrorDisplay(false);
      }, 2000);
    }
  }, [postError]);
  return (
    <>
      <div className="mt-7 mb-4 flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold mb-6">
          GET IN TOUCH WITH US
        </h1>
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <div className="formContainer bg-white shadow-lg p-8 md:p-10 rounded-xl flex flex-col items-center w-11/12 md:w-2/3 lg:w-1/2">
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-8"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-gray-800 font-semibold mb-2"
              >
                Name<sup className="text-red-500"> *</sup>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-gray-800 font-semibold mb-2"
              >
                Company<sup className="text-red-500"> *</sup>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Enter your company"
                value={formData.company}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-800 font-semibold mb-2"
              >
                Role<sup className="text-red-500"> *</sup>
              </label>
              <input
                id="role"
                name="role"
                type="text"
                placeholder="Enter your role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 font-semibold mb-2"
              >
                Email<sup className="text-red-500"> *</sup>
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="phonenumber"
                className="block text-gray-800 font-semibold mb-2"
              >
                Your Phone Number
              </label>
              <input
                id="phonenumber"
                name="phonenumber"
                type="text"
                placeholder="Enter your phone number"
                value={formData.phonenumber}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className={`w-full text-white font-semibold py-3 btn btn-primary ${
                formData.name === "" ||
                formData.company === "" ||
                formData.role === "" ||
                formData.email === ""
                  ? "btn-disabled"
                  : ""
              }`}
            >
              Submit
            </button>
            {isPending && (
              <div className="flex items-center justify-center">
                <span className="loading loading-dots loading-lg p-1 text-center"></span>
              </div>
            )}
            {postErrorDisplay && (
              <p className="text-red-500 break-words whitespace-normal text-center ">{`Please try again later.`}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
export default ContactForm;
