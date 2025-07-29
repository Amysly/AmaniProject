import React from 'react';
import StatsSection from '../components/StatsSection';

const About: React.FC = () => {
  return (
    <div>
      <section className="py-16 px-6 bg-gray-50 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-4xl font-bold text-center text-blue-800 mb-5 mt-10">
            About Amani College
          </h2>

          {/* Image + Intro */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="/images/about.jpg"
              alt="Amani College building"
              className="w-full rounded shadow-lg"
              data-aos="zoom-in"
            />
            <div>
              <h1 className="font-bold text-blue-900 text-xl mb-3">Brief History of Amani College</h1>
              <p className="lg:text-lg leading-relaxed">
                Amani College is a premier institution dedicated to academic excellence, leadership
                development, and holistic education. With a strong focus on health and science
                education, we equip students with the knowledge, values, and skills needed to thrive
                in a fast-changing world.
              </p>
              <p className="lg:text-lg leading-relaxed mt-4">
                Our campus fosters a nurturing and inclusive environment where innovation, critical
                thinking, and community engagement are key pillars of the student experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <StatsSection />
    </div>
  );
};

export default About;
