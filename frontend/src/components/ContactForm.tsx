import { ChangeEvent, useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phonenumber: "",
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
    console.log(formData);
  }

  function handleSubmit() {
    console.log(formData);
  }
  return (
    <>
      <div className="mt-7 mb-4 flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold mb-6">GET IN TOUCH WITH US</h1>
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
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default ContactForm;
