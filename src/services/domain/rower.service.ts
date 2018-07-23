import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class RowerService {

    constructor(
        public http: HttpClient) {
    }

    findMe() {
        return this.http.get(`${API_CONFIG.baseUrl}/rowers/me`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/rowers/${encodeURIComponent(email)}`);
    }  

    insert(obj: any) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/rowers`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}