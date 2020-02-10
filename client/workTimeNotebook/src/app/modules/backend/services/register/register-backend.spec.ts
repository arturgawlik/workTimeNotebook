import { RegisterBackendService } from './register-backend.service';
import { defer } from 'rxjs';


describe('RegisterBackendService', () => {

    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };
    let regiserBackendService: RegisterBackendService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        regiserBackendService = new RegisterBackendService(<any>httpClientSpy);
    })

    it('checkEmailNotTaken should return true', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(true));
        regiserBackendService.checkEmailNotTaken('email@email.com').subscribe(val => {
            expect(val).toBeTruthy();
            done();
        });
    });

    it('checkEmailNotTaken should return false', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncData(false));
        regiserBackendService.checkEmailNotTaken('email@email.com').subscribe(val => {
            expect(val).toBeFalsy();
            done();
        });
    });

    it('checkEmailNotTaken should throw error on backend error', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncError(null))
        regiserBackendService.checkEmailNotTaken('email@email.com').subscribe(
            () => {
                fail('should throw error.');
                done();
            },
            () => {
                expect().nothing();
                done();
            }
        );
    });

    it('register should pass without error', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncData(null));
        regiserBackendService.register('email@email.com', 'test123').subscribe(() => {
            expect().nothing();
            done();
        });
    });

    it('register should throw error on backend error', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncError(null));
        regiserBackendService.register('email@email.com', 'test123').subscribe(
            () => {
                fail('should throw error');
                done();
            },
            () => {
                expect().nothing();
                done();
            }
        );
    });

    function asyncData<T>(data: T) {
        return defer(() => Promise.resolve(data));
    }

    function asyncError<T>(errorObject: any) {
        return defer(() => Promise.reject(errorObject));
    }

});

