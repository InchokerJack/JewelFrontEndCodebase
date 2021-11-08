export interface ProposalDataType {
  id: string;
  description: string;
  options: string[];
  correctAnswer: boolean;
  rewardPercent: number;
  voteLimit: number;
  publishDate: null | string;
}
