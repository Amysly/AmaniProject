import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup'; 

const StatsSection: React.FC= () => {
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('stats-section');
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
          setStartCounting(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="stats-section"
      className="relative bg-grad py-12 md:py-16 mt-5 mb-10 w-full"
    >
      <div className="overlay"></div>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {/* Stat Item 1 - Year Established */}
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-2xl lg:text-5xl font-bold border-b-2 border-red-600 lg:pb-2 text-white text-center">
              {startCounting && (
                <CountUp end={2023} duration={2} suffix="" />
              )}
            </h1>
            <h2 className="text-xl md:text-xl lg:text-3xl font-bold text-white mt-2 text-center">
              Year Established
            </h2>
          </div>
          
          {/* Stat Item 2 - Graduated Students */}
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-2xl lg:text-5xl font-bold border-b-2 border-red-600 lg:pb-2 text-white text-center">
              {startCounting && (
                <CountUp end={2200} duration={2.5}  />
              )}
            </h1>
            <h2 className="text-xl md:text-xl lg:text-3xl font-bold text-white mt-2 text-center">
              Graduated Students
            </h2>
          </div>
          
          {/* Stat Item 3 - Academic Courses */}
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-2xl lg:text-5xl font-bold border-b-2 border-red-600 lg:pb-2 text-white text-center">
              {startCounting && (
                <CountUp end={50} duration={2}  />
              )}
            </h1>
            <h2 className="text-xl md:text-xl lg:text-3xl font-bold text-white mt-2 text-center">
              Academic Courses
            </h2>
          </div>
          
          {/* Stat Item 4 - Faculty Members */}
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-2xl lg:text-5xl font-bold border-b-2 border-red-600 lg:pb-2 text-white text-center">
              {startCounting && (
                <CountUp end={100} duration={2}/>
              )}
            </h1>
            <h2 className="text-xl md:text-xl lg:text-3xl font-bold text-white mt-2 text-center">
              Faculty Members
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;