import React from 'react';
import { 
  FaBook, 
  FaGraduationCap,
  FaUser, 
  FaHandsHelping, 
  FaBuilding, 
  FaChalkboardTeacher 
} from 'react-icons/fa';
import Gallary from '../components/Gallary';
import StatsSection from '../components/StatsSection';

const Home: React.FC = () => {
  return (
    <div className="">
      {/* Programs Section */}
      <section className="">
        <h1 className="text-center text-2xl lg:text-4xl mt-10 text-blue-800 font-bold">Our Programs</h1>
        <div className="min-h-[10rem] grid lg:grid-cols-3 gap-4 p-6 mb-5">
          <div className="bg-blue-800 shadow-lg rounded-sm text-center p-4 transition hover:shadow-xl">
            <div className="flex justify-center items-center text-red-600 text-2xl lg:text-5xl">
              <FaGraduationCap aria-hidden="true" />
            </div>
            <h2 className="text-white text-xl lg:text-2xl">Undergraduate Programs</h2>
          </div>
          <div className="bg-blue-800 shadow-lg rounded-sm text-center p-4 transition hover:shadow-xl">
            <div className="flex justify-center items-center text-red-600 text-2xl lg:text-5xl">
              <FaBook aria-hidden="true" />
            </div>
            <h2 className="text-white text-xl lg:text-2xl">Graduate Programs</h2>
          </div>
          <div className="bg-blue-800 shadow-lg rounded-sm text-center p-4 transition hover:shadow-xl">
            <div className="flex justify-center items-center text-red-600 text-2xl lg:text-5xl">
              <FaUser aria-hidden="true" />
            </div>
            <h2 className="text-white text-xl lg:text-2xl">Professional Development</h2>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
        <div className="mt-6 flex justify-center md:justify-start">
          <img 
            src="/images/feature.jpg" 
            alt="College Campus" 
            className="w-full max-w-md rounded-lg shadow-md" 
            data-aos="zoom-in"
            loading="lazy"
          />
        </div>

        <div className="space-y-6 lg:mt-16 ">
          <h1 className="text-2xl lg:text-3xl text-blue-800 font-bold">Welcome to Amani College of Health Science and Technology</h1>
          <p className="leading-relaxed lg:text-lg text-gray-600">
            Whether you're a new student, a returning family, or a prospective parent,
            we are excited to have you as part of our vibrant school community. Together, we will nurture minds,
            shape futures, and prepare tomorrow's leaders.
          </p>
          
          <div className="border-b"></div>

          {/* Vision and Mission */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl lg:text-2xl font-semibold text-blue-800">Vision Statement</h3>
              <p className="lg:text-lg leading-relaxed text-gray-600">
                To be a leading center of excellence where students are inspired to reach their full potential.
              </p>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl lg:text-2xl font-semibold text-blue-800">Mission Statement</h3>
              <p className="lg:text-lg leading-relaxed text-gray-600">
                Our mission is to provide a holistic education that nurtures academic excellence and critical thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-blue-800 mb-6">Why Choose Us</h2>
          <p className="lg:text-lg text-gray-700 mb-12">
            At the College of Health, we go beyond academics to build a foundation for lifelong success. 
            Here's why students and families choose us:
          </p>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col items-center" data-aos="fade-up">
              <FaChalkboardTeacher className="text-red-600 text-3xl mb-4" aria-hidden="true" />
              <h3 className="text-xl lg:text-2xl font-semibold text-blue-800 mb-3">Qualified Instructors</h3>
              <p className="text-gray-600">
                Our team of dedicated and experienced educators ensures high-quality teaching tailored to every learner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col items-center" data-aos="fade-up">
              <FaBuilding className="text-red-600 text-3xl mb-4" aria-hidden="true" />
              <h3 className="text-xl lg:text-2xl font-semibold text-blue-800 mb-3">Modern Facilities</h3>
              <p className="text-gray-600">
                We provide well-equipped labs, libraries, and classrooms designed to support hands-on learning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition h-full flex flex-col items-center" data-aos="fade-up">
              <FaHandsHelping className="text-red-600 text-3xl mb-4" aria-hidden="true" />
              <h3 className="text-xl lg:text-2xl font-semibold text-blue-800 mb-3">Student Support</h3>
              <p className="text-gray-600">
                From academic counseling to wellness services, we support our students every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Gallary />
      <StatsSection />
    </div>
  )
}

export default Home