import { PhoneCallIcon } from "lucide-react";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdEmail } from "react-icons/md";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setName("");
    setEmail("");
    setMessage("");
    alert("Your message has been sent");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Contact Information */}
        <div className="flex flex-col items-start justify-start space-y-4 px-4 py-6 shadow rounded-md hover:bg-gray-100 bg-white">
          <h3 className="text-lg font-bold text-yellow-500 font-serif">Contact Us</h3>
          <p className="flex items-center gap-2 hover:text-blue-600">
            <MdEmail className="h-6 w-6 text-gray-700" /> shop@eduka.co.ke
          </p>
          <p className="flex items-center gap-2 hover:text-blue-600">
            <PhoneCallIcon className="h-6 w-6 text-gray-700" /> +254711390861
          </p>
          <p className="flex items-center gap-2">
            <CiLocationOn className="h-6 w-6 text-gray-600" /> Nairobi, Kenya
          </p>
        </div>

        {/* Message Form */}
        <div className="flex flex-col shadow rounded-md bg-white p-6">
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-yellow-500 font-serif">Message Us</h3>

            <div className="flex flex-col">
              <label htmlFor="name" className="mt-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="lg:col-span-3 px-4 py-6 shadow rounded-md bg-white">
          <h3 className="text-lg sm:text-xl font-semibold text-yellow-500 mb-4 text-center">
            Find Us On The Map
          </h3>
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px] rounded-md overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d127649.13044240138!2d37.00207473267293!3d-1.1351346871630512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1759580590147!5m2!1sen!2ske"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
