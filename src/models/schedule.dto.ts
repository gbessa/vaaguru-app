import { RowerDTO } from "./rower.dto";
import { TeamDTO } from "./team.dto";

export interface ScheduleDTO {
    id: number;
    date: string;
    status: number;
    numOfSeats: number;
    obs: string;
    rowerResposable: RowerDTO;
    team: TeamDTO;
} 