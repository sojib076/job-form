export interface JobPayload {
  companyName: string;
  position: string;
  contract: "Full Time" | "Part Time";
  location: string;
  description: string;
}