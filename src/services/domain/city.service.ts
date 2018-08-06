import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CityService {

    constructor(
        public http: HttpClient) {
            
    }

    getData() {
        return this.http.get(`./assets/data/cities_brazil.json`);
    } 

}