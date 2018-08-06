import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { CountryDTO } from "../../models/country.dto";

@Injectable()
export class CountryService {

    constructor(
        public http: HttpClient) {
    }

    findAll(): Observable<any> {        
        const URL_COUTRIES_API = 'https://restcountries.eu/rest/v2/all';
        return this.http.get<any>(URL_COUTRIES_API);
    }

}