import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredentialsDTO } from "../models/credentials.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storage: StorageService
    ) {
    }
   
    authenticate(creds: CredentialsDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
               observe: 'response',
               responseType: 'text'
            })
    }

    authenticateWithFacebook(token: string) {
        let creds: CredentialsDTO = {
            email: "",
            password: "",
            facebookToken: token
        };
        creds.facebookToken = token;
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
               observe: 'response',
               responseType: 'text'
            })
    }

    successfullLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null); 
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
               observe: 'response',
               responseType: 'text'
            })
    }

    resetPassword(email: any) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/forgot`, 
            email,
            {
               observe: 'response',
               responseType: 'text'
            })
    }
}