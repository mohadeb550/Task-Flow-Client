
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoMdQuote } from 'react-icons/io'
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';




function UsingPeople() {

    const axiosPublic = useAxiosPublic()

    const { data: users =[] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const data = await axiosPublic.get(`/all-users`);
          return data.data;
        }
      })


  const responsiveSettings = [
    {
      breakpoint: 1024, 
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 930,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 1,
      },
    },
  ];


  const settings = {
    dots: true,
    infinite: true, 
    speed: 500, 
    autoplay: true, 
    autoplaySpeed: 2000,
    slidesToShow: 3, 
    slidesToScroll: 1, 
    responsive: responsiveSettings,
  };

  return (
    <div className="autoplay-slider my-20 lg:my-32 w-[95%] mx-auto">
        <h1 className="text-[26px] md:text-3xl lg:text-5xl text-[#00719C] font-racing text-center mb-2 md:mb-5 lg:mb-8"> People are using this website</h1>
        <p className="text-sm md:text-base italic text-gray-500 text-center mb-8 md:mb-14 max-w-[1000px] mx-auto">Professionals with demanding work schedules can use a to-do website to organize tasks, prioritize deadlines, and manage projects efficiently.
Benefits: Increased productivity, reduced stress, and improved time management. </p>
      <Slider {...settings}>

       {users.map(user => {
        return (
          <>
           <div className='bg-[#00719C]/5 p-[26px] md:p-8 flex flex-col justify-center items-center gap-3 mx-2 h-80'>
          <span><IoMdQuote className='text-3xl text-[#00719C]'/></span>
          <h4 className='text-[20px] font-semibold text-[#00719C]'> {user.profession}</h4>
          <img className='w-[100px] h-[100px] md:w-[110px] md:h-[110px] rounded-full object-cover' src={user.image}/>
          <h2 className='font-semibold text-lg'> {user.name} </h2>
        </div>
          </>
        )
       })}
        
      </Slider>
    </div>
  );
}

export default UsingPeople;