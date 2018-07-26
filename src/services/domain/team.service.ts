import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TeamDTO } from "../../models/team.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class TeamService {

    constructor(
        public http: HttpClient) {
    }

    findAll(): Observable<TeamDTO[]> {
        return this.http.get<TeamDTO[]>(`${API_CONFIG.baseUrl}/teams`);
    }

    findOwned(): Observable<TeamDTO[]> {
        return this.http.get<TeamDTO[]>(`${API_CONFIG.baseUrl}/teams?isowner=true`);
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/teams/${id}`);
    }    

    insert(obj: any) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/teams`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}