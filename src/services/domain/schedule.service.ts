import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ScheduleDTO } from "../../models/schedule.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ScheduleService {

    constructor(
        public http: HttpClient) {
    }

    findAll(): Observable<ScheduleDTO[]> {
        return this.http.get<ScheduleDTO[]>(`${API_CONFIG.baseUrl}/schedules`);
    }

}