import { Clock,CreditCard,Shield } from "lucide-react";
interface IAdvantage {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon:React.ElementType;
  color:string;
}

const AdvantagesData: IAdvantage[] = [
  {
    id: 1,
    title: "Quick Processing",
    description: "Get loans approved within minutes",
    features: ["Instant approval", "Less paperwork"],
    icon:Clock,
    color:"green",
  },
  {
    id: 2,
    title: "Flexible Repayment",
    description: "Choose a repayment plan that works for you",
    features: ["Monthly installments", "Low-interest rates"],
    icon:CreditCard,
    color:"blue",
  },
  {
    id: 3,
    title: "Secure & Reliable",
    description: "We ensure your financial security",
    features: ["Encrypted transactions", "Trusted by thousands"],
    icon:Shield,
    color:"red"
  },
];

export default AdvantagesData;
