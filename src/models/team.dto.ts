import { RowerDTO } from "./rower.dto";

export interface TeamDTO {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    owners: RowerDTO[];
} 