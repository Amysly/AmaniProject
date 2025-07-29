import React from 'react';

type Course = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const courses: Course[] = [
  {
    id: 1,
    image: '/images/Orthopedi.png',
    title: 'Community Health',
    description: 'Train to become a licensed community health officer and support local health care needs.',
  },
  {
    id: 2,
    image: '/images/Medicine.png',
    title: 'Pharmacy Technician',
    description: 'Learn the fundamentals of pharmacology, prescriptions, and drug dispensing.',
  },
  {
    id: 3,
    image: '/images/Laboratory.png',
    title: 'Nursing Assistant',
    description: 'Get certified to provide essential patient care under professional supervision.',
  },
  {
    id: 4,
    image: '/images/Health.png',
    title: 'Public Health',
    description: 'Promote health awareness and disease prevention at community and national levels.',
  },
  {
    id: 5,
    image: '/images/Doctors.png',
    title: 'Health Assistant',
    description: 'Support healthcare teams by handling patient preparation, records, and basic care.',
  },
  {
    id: 6,
    image: '/images/Laboratory.png',
    title: 'Medical Lab Technician',
    description: 'Learn diagnostic testing, sample analysis, and lab safety procedures.',
  },
];

const Courses: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl lg:text-4xl font-bold text-center text-blue-800 mb-4 mt-8">Our Courses</h2>
        <p className="text-center text-gray-600 mb-12 lg:text-xl">
          Explore accredited health-related programs designed to build skills for the future.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={100 + index * 300}
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="lg:text-xl font-semibold text-blue-700 mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
