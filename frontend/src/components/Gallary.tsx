import React from 'react'

  type Gallary = {
    id: number,
    image: string,
    title: string
  }

const gallaries :Gallary[] = [
    {
        id: 1,
        image: '/images/outreach1.jpeg',
        title: 'University Outreach Program'
    },
    {
        id: 2,
        image: '/images/staffvc.jpeg',
        title: 'VC with Staff Members'
    },
    {
        id: 3,
        image: '/images/exams.jpeg',
        title: 'Examination Hall'
    },
    {
        id: 4,
        image: '/images/outreach2.jpeg',
        title: 'Community Service'
    },
    {
        id: 5,
        image: '/images/staffvc2.jpeg',
        title: 'University Leadership'
    },
    {
        id: 6,
        image: '/images/outreach3.jpeg',
        title: 'Student Outreach Activity'
    }
]

const Gallary: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className=" text-2xl lg:text-4xl font-bold text-blue-600 mb-4">Our Gallery</h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallaries.map((gallery) => (
            <div 
              key={gallery.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={gallery.image} 
                alt={gallery.title} 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white lg:text-xl font-bold mb-2">{gallery.title}</h3>
                  <div className="w-12 h-1 bg-blue-400 mb-3"></div>
                </div>
              </div>
              
              {/* Static subtle overlay (always visible but less prominent) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-sm font-medium opacity-70 group-hover:opacity-0 transition-opacity duration-300">
                  {gallery.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallary