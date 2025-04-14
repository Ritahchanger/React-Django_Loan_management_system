interface IInvestmentResponse {
  id: number;
  project: number;
  project_name: string;
  pitched_by: string;
  amount: string;
  investor: number;
  invested_at: number;
}

export type { IInvestmentResponse };
