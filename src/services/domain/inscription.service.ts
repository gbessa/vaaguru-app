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

    remove(obj: InscriptionDTO) {
        return this.http.delete(
            `${API_CONFIG.baseUrl}/inscriptions/${obj.id}`,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    //delete(inscription: InscriptionDTO | number): Observable<InscriptionDTO> {
    //const id = typeof inscription === 'number' ? inscription : inscription.id;
    //const url = `${API_CONFIG.baseUrl}/inscriptions/${id}`;
  
    //return this.http.delete<InscriptionDTO>(url, httpOptions).pipe(
    //  tap(_ => this.log(`deleted hero id=${id}`)),
    //  catchError(this.handleError<Hero>('deleteHero'))
    //);
  

}