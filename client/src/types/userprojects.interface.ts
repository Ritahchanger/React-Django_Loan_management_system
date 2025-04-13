interface userProjectsResponse {
  id: number;
  title: string;
  category: string;
  problem: string;
  solution: string;
  goals: string;
  budget: string;
  pitched_by: string;
  status: string;
  total_invested: string;
  investors_list: string[];
}

export type { userProjectsResponse };
