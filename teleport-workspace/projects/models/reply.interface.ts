
export interface Reply {
    id: number;
    message: string;
    replydate: Date;
    userId: number;
    user?: {
      id: number;
      firstname: string;
      lastname: string;
      email: string;
    };
  }
  