import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { LoginBackendService } from './login-backend.service';
import { _login_method_url, _login_controller_url, _backend_url } from '../../utils/utils';

describe('LoginBackendService', () => {
    let httpTestingController: HttpTestingController;
    let loginBackendService: LoginBackendService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoginBackendService
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        loginBackendService = TestBed.inject(LoginBackendService);
    });

    it('can retrive token from backend', () => {
        const url = _backend_url + _login_controller_url + _login_method_url;

        loginBackendService.login('test', 'test').subscribe(
            res => {
                expect(res).toBeTruthy();
            },
            err => {
                fail('cant throw error');
            }
        );

        const req = httpTestingController.expectOne(url);

        expect(req.request.method).toEqual('POST');

        req.flush('test');
        // req.flush('test', {status: 400, statusText: 'Bad request'});
        httpTestingController.verify();
    });

});
