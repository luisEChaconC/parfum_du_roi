export interface PerfumeData {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  targetGender: string;
  imagePaths: string[];
  concentration: string;
  category: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
}

import axios from "axios";


export const loadPerfumesByCategory = async (category: string): Promise<PerfumeData[]> => {
  const response = await axios.get<PerfumeData[]>(`/api/perfume/category/${category}`);
  return response.data;
};

export const loadPerfumeById = async (id: string): Promise<PerfumeData> => {
  const response = await axios.get<PerfumeData>(`/api/perfume/${id}`);
  return response.data;
};
