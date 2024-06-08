export interface SignupValidation {
  name: string;
  email: string;
  password: string;
}
export interface SigninValidation {
  email: string;
  password: string;
}
export interface SuccessResponse {
  message: string;
}
export interface ErrorResponse {
  error: string;
}
