import { StatusCode } from "../enums/StatusCode.enum";
import { CharacterShuffle } from "./CharacterShuffle";

export interface CharacterShuffleResponse {
    chars: CharacterShuffle[],
    response: {
        status: string;
        code: StatusCode;
        message?: string
    }
}