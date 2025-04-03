import AdvantagesData from "./AdvantagesData";

import Title from "../Title/Title";

const Advantages = () => {
  return (
    <section className="py-[6rem] bg-gray-50">
      <div className="container mx-auto px-6">
        <Title title=" Why Choose Us?" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AdvantagesData.map((data, index) => (
            <div
              key={index}
              className="border flex justify-center flex-col items-center md:block  border-neutral-300 bg-white p-6  rounded-lg transition-all hover:shadow-lg"
            >
              <div className="flex items-center mb-2">
                <div className="mr-[0.5rem] font-semibold">
                  <data.icon color={data.color}  />
                </div>
                <h3 className="text-xl font-medium text-gray-900 ">
                  {data.title}
                </h3>
              </div>
              <p className="text-gray-700 mb-4 text-center ">{data.description}</p>
              <ul className="list-disc list-inside text-gray-600">
                {data.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
