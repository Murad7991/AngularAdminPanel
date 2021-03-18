import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../../../shared/interface';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}
    public error$: Subject<string> = new Subject<string>();
    get token(): string {
        const expDate = new Date (localStorage.getItem('fb-token-exp'));
        if (new Date() > expDate) {
            this.logOut();
            return null;
        } else {
            return localStorage.getItem('fb-token');
        }
    }
    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
           .pipe(
           tap(this.setToken),
           catchError(this.handleError.bind(this))
           );
    }
    logOut() {
        this.setToken(null);
    }
    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;
        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Dont exist this email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Wrong Password');
                break;
            case 'INVALID_EMAIL':
                this.error$.next('Wrong Email');
                break;
        }
    }
    isAuthenticated(): boolean {
        return !!this.token;
    }
    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }
}
