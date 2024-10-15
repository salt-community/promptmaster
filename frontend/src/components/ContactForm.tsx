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
      <div className="mt-7 mb-4 flex flex-col items-center ">
        {/* <p className="text-[#d05f48] text-xs">GET IN TOUCH</p> */}
        <h1 className="text-4xl text-white font-black mb-6">GET IN TOUCH</h1>
      </div>
      <div className="flex justify-center mt-4 mb-4 ">
        <div className="formContainer bg-white p-6 md:p-8 rounded-lg  flex flex-col items-center w-2/3 lg:w-1/2">
          <form
            id="contactForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-black mb-1"
              >
                Name<sup className="text-[#d05f48] font-black"> *</sup>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-gray-700 font-black mb-1"
              >
                Company<sup className="text-[#d05f48] font-black"> *</sup>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-black mb-1"
              >
                Email<sup className="text-[#d05f48] font-black"> *</sup>
              </label>
              <input
                id="email"
                name="email"
                placeholder="Email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 font-black mb-1"
              >
                Your Phone Number
              </label>
              <input
                id="phonenumber"
                name="phonenumber"
                placeholder="Phone Number"
                type="text"
                value={formData.phonenumber}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
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
