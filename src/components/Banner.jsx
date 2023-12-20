

export default function Banner() {


    return (
     <div  className="hero h-[480px] lg:h-[500px] mb-3 md:mb-8 font-play flex flex-col md:flex-row justify-around items-center bg-[#009BD6]  px-10 md:px-16 md:pb-12" >

<div className="flex-1 h-full w-full pt-6 md:pt-14">
        <img src="3d-illustration-pen-putting-blue-ticks-paper-removebg-preview.png" className=" h-[200px] md:h-full w-full object-cover" />
    </div>
    
    <div className=" text-center text-neutral-content flex-1">
      <div className="max-w-4xl space-y-2 lg:space-y-5">
        <h1 className=" text-4xl lg:text-7xl font-racing text-white/90"> Effortless Task Mastery</h1>
        <p className="text-xs md:text-base italic text-white/80">Welcome to TaskFlow, where productivity meets simplicity! Streamline your life and boost your efficiency with our intuitive task management platform. Organize, prioritize, and conquer your daily tasks effortlessly. </p>
        
      </div>
    </div>

  </div>
    )
  }
  