import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { InvitationDTO } from "../../models/invitation.dto";

@Injectable()
export class InvitationService {

    constructor(
        public http: HttpClient) {
            
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

}