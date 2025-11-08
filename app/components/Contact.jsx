import React from "react";

const Contact = () => {
  return (
    <div>
      <div
        id="contact"
        className='w-full px-[8%] py-16 md:px-[12%] md:py-24 scroll-mt-20 bg-gradient-to-b from-white via-gray-50 to-white transition-all duration-700 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center
        bg-[length:90%_auto]'>
        <h4 className="text-center mb-2 text-base md:text-lg font-Ovo text-black-600 tracking-wide animate-fadeInUp">
          Connect with me
        </h4>
        <h2 className="text-center text-3xl md:text-5xl font-Ovo font-semibold text-black-900 animate-fadeInUp delay-100">
          Get in touch
        </h2>

        <p className="text-center max-w-2xl mx-auto mt-4 mb-12 md:mt-6 md:mb-16 text-black-600 font-Ovo leading-relaxed animate-fadeInUp delay-200 text-base md:text-lg">
          I'd love to hear from you, if you have any questions, commets, or feedback, please use the form below.
        </p>
        
        <form className="max-w-2xl mx-auto">
          <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
            <input type="text" placeholder='Enter your Name' required/>
            <input type="email" placeholder='Enter your Email' required/>
          </div>
          <textarea rows={6} placeholder="Enter your message" required></textarea>

          <button type="submit">Submit now</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
