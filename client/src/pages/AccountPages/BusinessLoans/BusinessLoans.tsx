import React from 'react';
import {
  Rocket,
  TrendingUp,
  UserCheck,
  ArrowRightCircle,
  Info,
} from 'lucide-react';
import Navbar from '../../../components/Navbar/Navbar';

const businessLoanOptions = [
  {
    title: 'Startup Pitch',
    icon: <Rocket className="w-6 h-6 text-purple-600" />,
    description:
      'If you’re a startup, pitch your idea to potential investors. No repayment needed – just a compelling vision.',
    note: 'Minimum investor contribution: Ksh 100,000',
    action: 'Pitch Now',
  },
  {
    title: 'Business Growth Loan',
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    description:
      'Secure funding to expand or scale your existing business. Flexible repayment options and fast approvals.',
    action: 'Apply Now',
  },
];

const BusinessLoans: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Business Loan Options
          </h1>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Whether you're launching a startup or expanding your company, we provide tailored financial solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {businessLoanOptions.map((loan, index) => (
            <div
              key={index}
              className="bg-white border-l-4 rounded-2xl shadow p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {loan.icon}
                <h2 className="text-xl font-semibold text-gray-800">
                  {loan.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-2">{loan.description}</p>
              {loan.note && (
                <p className="text-xs text-purple-500 italic mb-4">
                  {loan.note}
                </p>
              )}
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline hover:text-blue-800">
                {loan.action} <ArrowRightCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
          <Info className="text-blue-500 w-6 h-6 mt-1" />
          <p className="text-gray-700 text-sm">
            Startups don’t apply for loans – they pitch to investors who fund them based on idea potential. Make sure to have a solid business plan and presentation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessLoans;
