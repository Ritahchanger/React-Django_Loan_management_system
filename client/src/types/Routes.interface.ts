interface IRoute{

    id:number;

    name:string;

    path:string;

    icon?:any;

    color?:string;

}



interface ILoanApplicationData {
    user: number;
    category: string;
    amount: number;
    duration_months: number;
    reason: string;
    status: string;
  }



export type { IRoute, ILoanApplicationData }