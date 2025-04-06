import { ITestimonials } from "../../types/Testmonials.interface";

import Title from "../Title/Title";


const testimonials: ITestimonials[] = [
  {
    id: 1,
    name: "Jennifer Mbokio",
    urlImage:
      "https://images.pexels.com/photos/29654702/pexels-photo-29654702/free-photo-of-black-and-white-silhouette-of-woman-s-profile.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Investing in this platform has truly transformed my financial journey. The returns are consistent, and the support is excellent!",
    position: "CEO, Future Wealth Co.",
  },
  {
    id: 2,
    name: "Kelvin Jackson",
    urlImage:
      "https://images.pexels.com/photos/29654702/pexels-photo-29654702/free-photo-of-black-and-white-silhouette-of-woman-s-profile.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "As a first-time investor, I was nervous — but this platform made everything so easy to understand. I highly recommend it.",
    position: "Financial Analyst",
  },
  {
    id: 3,
    name: "Abel Michael",
    urlImage:
      "https://images.pexels.com/photos/29654702/pexels-photo-29654702/free-photo-of-black-and-white-silhouette-of-woman-s-profile.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "The best loan and investment platform I've used! Transparent, secure, and truly empowering for small businesses.",
    position: "Startup Founder",
  },
  // {
  //   id: 4,
  //   name: "Titus Jackson",
  //   urlImage:
  //     "https://images.pexels.com/photos/29654702/pexels-photo-of-black-and-white-silhouette-of-woman-s-profile.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   description:
  //     "I love how simple and efficient the loan process is. Funds are always accessible when I need them most.",
  //   position: "Retail Business Owner",
  // },
];

const Testimonials = () => {
  return (
    <div className="bg-green-500 py-[6rem]">
      <div className="container mx-auto px-4">
        <Title title="Testimonials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-neutral-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-neutral-300 mr-4">
                  <img
                    src={testimonial.urlImage}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{testimonial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
