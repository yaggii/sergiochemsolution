export interface Project {
  id: string;
  projectName: string;
  solutionName: string;
  problemDescription: string;
  solutionDescription: string;
  impact: string;
  experts: string;
  technicalArea: string;
  country: string;
  coordinates: [number, number];
  contactPoint: string;
  imageUrl?: string;
  tags: string[];
  createdAt: number;
  owner: string;
}