export type HarassmentType = 'marriage' | 'children' | 'age';

export interface HarassmentTypeInfo {
  title: string;
  warnings: string[];
  fines: string[];
}

export type HarassmentTypes = Record<HarassmentType, HarassmentTypeInfo>; 