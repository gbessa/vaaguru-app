import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TeamDTO } from "../../models/team.dto";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { InvitationDTO } from "../../models/invitation.dto";

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
    
    findInvitations(teamId: number): Observable<InvitationDTO[]> {
        return this.http.get<InvitationDTO[]>(`${API_CONFIG.baseUrl}/teams/${teamId}/invitations`);
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