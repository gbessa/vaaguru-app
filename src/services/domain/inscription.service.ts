import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { InscriptionDTO } from "../../models/inscription.dto";

@Injectable()
export class InscriptionService {

    constructor(
        public http: HttpClient) {
    }

    findAll(schedule_id): Observable<InscriptionDTO[]> {
        return this.http.get<InscriptionDTO[]>(`${API_CONFIG.baseUrl}/schedules/${schedule_id}/inscriptions`);
    }

    insert(obj: any) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/inscriptions`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}