import { serviceData } from "@/assets/assets";
import React from "react";
import Image from "next/image";

const Services = () => {
  return (
    <div
      id="services"
      className="w-full px-[8%] py-16 md:px-[12%] md:py-24 scroll-mt-20 bg-gradient-to-b from-white via-gray-50 to-white transition-all duration-700"
    >
      <h4 className="text-center mb-2 text-base md:text-lg font-Ovo text-black-600 tracking-wide animate-fadeInUp">
        What I offer
      </h4>
      <h2 className="text-center text-3xl md:text-5xl font-Ovo font-semibold text-black-900 animate-fadeInUp delay-100">
        My Services
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-4 mb-12 md:mt-6 md:mb-16 text-black-600 font-Ovo leading-relaxed animate-fadeInUp delay-200 text-base md:text-lg">
        I'm a web programmer from the Dominican Republic, with 4 years of
        experience in multiple companies, analyzing ideas and turning projects
        into success.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {serviceData.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="group relative border border-gray-200 bg-white rounded-2xl px-6 py-10 sm:px-8 sm:py-12 text-center shadow-md 
                        hover:shadow-xl hover:translate-y-[-4px] hover:bg-gray-50 
                        transition-all duration-500 ease-out animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-center items-center mb-4">
              <div className="p-3 md:p-4 rounded-xl bg-gray-100 group-hover:bg-black/90 transition-all duration-500">
                <Image
                  src={icon}
                  alt={title || "Service Icon"}
                  className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-500 group-hover:scale-110"
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <h3 className="text-lg my-3 sm:my-4 text-gray-800 font-semibold group-hover:text-black transition-colors duration-300">
              {title}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>

            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg bg-gradient-to-br from-black/5 to-transparent -z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
