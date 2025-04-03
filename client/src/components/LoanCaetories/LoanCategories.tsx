import Title from "../Title/Title";

const categories = [
  { name: "Business Loans", description: "Startups & business growth funding" },
  { name: "Personal Loans", description: "Education & emergency funds" },
  { name: "Asset Financing", description: "Car & home financing" },
];

const LoanCategories = () => {
  return (
    <div id="loans" className="container mx-auto my-[6rem]">
     <Title title="Loan Categories" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {categories.map((loan, index) => (
          <div key={index} className="p-6 border border-neutral-300 rounded flex flex-col items-center">
            <h3 className="text-xl font-semibold">{loan.name}</h3>
            <p className="mt-2">{loan.description}</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Apply Now 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanCategories;
