import { StatusCode } from '../enums/StatusCode.enum';
import { ICharacter } from './../entities/Character';
export interface CharactersResponse {
    chars: ICharacter[]
    pagination: {
        hasPagination?: boolean;
        take?: number | undefined;
        currentPage?: number | undefined;
        totalPages?: number | undefined;
    };
    response?: {
        status: string;
        code: StatusCode;
        message?: string
    }
}