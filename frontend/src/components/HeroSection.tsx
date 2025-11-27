import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Slide = {
  image: string;
  title: string;
  text: string;
};

const slides: Slide[] = [
  {
    image: '/images/imagebg.jpg',
    title: 'Welcome to HillStone College',
    text: 'Building leaders for the future.',
  },
  {
    image: '/images/about1.jpg',
    title: 'Excellence in Health Education',
    text: 'Empowering students through innovation and integrity.',
  },
  {
    image: '/images/image1.jpg',
    title: 'Shape Your Future Here',
    text: 'Discover your path. Achieve your dreams.',
  },
];

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-[100vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full relative mt-[80px]"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-aos="fade-down">
                  {slide.title}
                </h1>
                <p className="text-xl lg:text-lg max-w-2xl" data-aos="fade-right">
                  {slide.text}
                </p>
               <Link to="/register">
              <button className="bg-blue-600 py-2 px-4 mt-10 text-2xl rounded-full">
                Register Here
              </button>
            </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
