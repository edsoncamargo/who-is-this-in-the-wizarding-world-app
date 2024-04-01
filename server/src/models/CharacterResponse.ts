import { ICharacter } from "../entities/Character";
import { StatusCode } from "../enums/StatusCode.enum";

export interface CharacterResponse {
    haveJustBeenAdded: ICharacter[];
    haveAlreadyBeenAdded: ICharacter[];
    haveNotAdded: ICharacter[];
    response: {
        status: string;
        code: StatusCode;
        message?: string
    }
}