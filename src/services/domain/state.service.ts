import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class StateService {

    constructor(
        public http: HttpClient) {
    }

    findAll(): Observable<any> {        
        const URL_STATES_API = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
        return this.http.get<any>(URL_STATES_API);
    }

}

