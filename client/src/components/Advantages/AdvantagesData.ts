interface IAdvantage {
  id: number;
  title: string;
  description: string;
  features: string[];
}

const AdvantagesData: IAdvantage[] = [
  {
    id: 1,
    title: "Quick Processing",
    description: "Get loans approved within minutes",
    features: ["Instant approval", "Less paperwork"],
  },
  {
    id: 2,
    title: "Flexible Repayment",
    description: "Choose a repayment plan that works for you",
    features: ["Monthly installments", "Low-interest rates"],
  },
  {
    id: 3,
    title: "Secure & Reliable",
    description: "We ensure your financial security",
    features: ["Encrypted transactions", "Trusted by thousands"],
  },
];

export default AdvantagesData;
