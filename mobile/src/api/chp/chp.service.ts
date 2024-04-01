import http from "../../lib/http";

export interface Chars {
  id: string;
  name: string;
  blood: string;
  born: string;
  species: string;
  gender: string;
  house: string;
  url: string;
}

export interface Pagination {
  hasPagination: boolean;
  take: number;
  currentPage: number;
  totalPages: number;
}

export interface Response {
  status: string;
  code: number;
}

export interface CharsInformations {
  chars: Chars[];
  pagination: Pagination;
  response: Response;
}

export default class ChpService {
  constructor() {}

  async getShuffledChars(limit: number | undefined = undefined) {
    const queryString = limit ? `?limit=${limit}` : "";
    return await http.get(`/api/v1/characters/shuffle${queryString}`);
  }

  async getChars(take: number = 10, currentPage: number = 1) {
    const queryString = `?take=${take}&currentPage=${currentPage}`;
    return await http.get(`/api/v1/characters${queryString}`);
  }
}
