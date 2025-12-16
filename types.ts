export enum AgeGroup {
  TODDLER = "2-3 years",
  PRESCHOOL = "4-5 years",
  EARLY_ELEM = "6-8 years",
  ALL = "2-8 years"
}

export interface MathActivity {
  title: string;
  description: string;
  mathConcept: string;
  educationalValue: string; // The "Why" based on ECE research
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  tags: string[];
}

export interface GenerationResponse {
  activities: MathActivity[];
}
