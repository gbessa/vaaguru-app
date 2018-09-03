import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { InvitationDTO } from "../../models/invitation.dto";
import { Observable } from "rxjs";

@Injectable()
export class InvitationService {

    constructor(
        public http: HttpClient) {
            
    }

    findInvitationsToMe(): Observable<InvitationDTO[]> {
        return this.http.get<InvitationDTO[]>(`${API_CONFIG.baseUrl}/invitations`);
    }    

        
    findOpenInvitationsByTeam(teamId: number): Observable<InvitationDTO[]> {
        return this.http.get<InvitationDTO[]>(`${API_CONFIG.baseUrl}/teams/${teamId}/invitations`);
    }

    insert(obj: InvitationDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/invitations`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    accept(obj: InvitationDTO) {
        obj.status = 2;
        return this.http.put(
            `${API_CONFIG.baseUrl}/invitations/${obj.id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}