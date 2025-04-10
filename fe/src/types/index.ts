interface ApiSuccess {
  success: boolean;
  message: String;
  data?: String;
}

export interface ApiResponse {
  data: ApiSuccess;
}
