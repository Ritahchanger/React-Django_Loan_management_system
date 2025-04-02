import AdvantagesData from "./AdvantagesData";

import Title from "../Title/Title";

const Advantages = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <Title title=" Why Choose Us?" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AdvantagesData.map((data, index) => (
            <div
              key={index}
              className="border border-neutral-300 bg-white p-6  rounded-lg transition-all hover:shadow-lg"
            >
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {data.title}
              </h3>
              <p className="text-gray-700 mb-4">{data.description}</p>
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
