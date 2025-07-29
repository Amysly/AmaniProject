import React from 'react';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <>
      <section className='bg-contact'>
        <div className="overlay-contact"></div>
        <div className="text-center relative z-10 pt-32 pb-16">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-3 mt-20"
            data-aos="fade-down"
          >
            Get In Touch With Us
          </h2>
          <p
            className="text-lg text-white max-w-2xl mx-auto"
            data-aos="fade-down"
          >
            Have questions or feedback? We're here to help. Reach out to us
            through any of these channels.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gray-50 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information Card */}
            <div className="bg-white p-8 rounded-lg shadow-md lg:col-span-1 h-full">
              <h3 className="text-xl font-bold text-red-600 mb-6 text-center">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-200 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Our Location
                    </h4>
                    <p className="text-gray-600">
                      123 Health Road, Abuja, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-200 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Phone Number
                    </h4>
                    <p className="text-gray-600">+234 801 234 5678</p>
                    <p className="text-gray-600">+234 802 345 6789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-200 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Email Address
                    </h4>
                    <p className="text-gray-600">
                      info@amanicollege.edu.ng
                    </p>
                    <p className="text-gray-600">
                      admissions@amanicollege.edu.ng
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-200 p-3 rounded-full mr-4">
                    <FaClock className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Working Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8am - 5pm
                    </p>
                    <p className="text-gray-600">Saturday: 9am - 2pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form and Map */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-bold text-red-600 mb-6 text-center">
                  Send Us a Message
                </h3>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                  >
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-4 rounded-lg shadow-md mt-12">
            <h3 className="text-xl font-bold text-red-600 mb-4 text-center">
              Find Us on Map
            </h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.923185969669!2d7.469290315326543!3d9.012632893504814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e8775ac8a5a2b%3A0x1e6348a8f8e9f1d!2sAbuja%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="College Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
