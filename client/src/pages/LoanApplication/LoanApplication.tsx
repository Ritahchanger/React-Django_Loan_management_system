import AccountLayout from "../../Layout/AccountLayout";
import Title from "../../components/Title/Title";
import LoanApplicationForm from "../Loans/LoanApplication";
const LoanApplication = () => {
  return (
    <AccountLayout>
      <Title title="LOAN APPLICATION" />
      <LoanApplicationForm />
    </AccountLayout>
  );
};

export default LoanApplication;
