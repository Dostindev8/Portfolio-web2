import { assets, workData } from "@/assets/assets";
import React from "react";
import Image from "next/image";

const Work = () => {
  return (
    <div
      id="work"
      className="w-full px-[8%] py-16 md:px-[12%] md:py-24 scroll-mt-20 bg-gradient-to-b from-white via-gray-50 to-white transition-all duration-700"
    >
      <h4 className="text-center mb-2 text-base md:text-lg font-Ovo text-black-600 tracking-wide animate-fadeInUp">
        My portfolio
      </h4>
      <h2 className="text-center text-3xl md:text-5xl font-Ovo font-semibold text-black-900 animate-fadeInUp delay-100">
        My latest work
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-4 mb-12 md:mt-6 md:mb-16 text-black-600 font-Ovo leading-relaxed animate-fadeInUp delay-200 text-base md:text-lg">
        Welcome to my web development porfolio, Explore a collection of projects
        showcasing my experience in fullstack web development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-6 md:gap-8">
        {workData.map((project, index) => (
          <div
            className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden
            relative cursor-pointer group shadow-lg hover:shadow-xl transition-shadow duration-300"
            key={index}
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div
              className="bg-white w-10/12 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2
              py-3 px-5 flex flex-col items-start justify-between duration-500 transition-all 
              group-hover:bottom-7 group-hover:shadow-2xl opacity-95 group-hover:opacity-100"
            >
              <div>
                <h2 className="text-lg font-semibold text-black-900">
                  {project.title}
                </h2>
                <p className="text-sm text-black-600">{project.description}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
          </div>
        ))}
        <a
          href=""
          className="w-max flex items-center justify-center gap-2 text-black-700 border-[0.5px] border-black-700 rounded-full
          py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500">
          Show more
          <Image
            src={assets.right_arrow_bold}
            alt="Right arrow"
            className='w-4'
          />
        </a>
      </div>
    </div>
  );
};

export default Work;
