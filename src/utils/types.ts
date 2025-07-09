export interface JobPayload {
  companyName: string;
  userId?: string;
  position: string;
  contract: "Full Time" | "Part Time";
  location: string;
  description: string;
}

export interface JobParams {
  _id?: string;
  userId?: string;
  companyName?: string;
  location?: string;
  contract?: string;
  page?: number;
  limit?: number;
  createdAt?: string;
  position?: string;
  description?: string;
}
