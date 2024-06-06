export interface ClientRequestForm {
    name: string;
    phone: string;
    email: string;
    projectLink: string;
    projectDetails: string;
    issueArise: string;
    projectCredentials: string;
  
  }

export interface SuccessResponse {
    message: string;
  }
export interface ErrorResponse {
    error: string;
  }
  