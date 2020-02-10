import { WorkTimeNoteBackendService } from "./workTimeNote-backend.service";
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { WorkTimeNoteBackendModel } from '../../models/workTimeNoteBackendModel.model';

describe('WorkTimeNoteBackendService', () => {

    let workTimeNoteBackendService: WorkTimeNoteBackendService;
    let httpClientSpy: any;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

        TestBed.configureTestingModule({
            providers: [
                WorkTimeNoteBackendService,
                { provide: HttpClient, useValue: spy }
            ]
        });

        workTimeNoteBackendService = TestBed.inject(WorkTimeNoteBackendService);
        httpClientSpy = TestBed.inject(HttpClient);
    });

    it('getAll should return array of items', (done: DoneFn) => {
        const expectObj: WorkTimeNoteBackendModel[] = [
            {
                id: 'test',
                type: 'test',
                customer: 'test',
                description: 'test',
                uri: 'test',
                startDate: 'test',
                endDate: 'test',
                spentTimeInMinutes: 1
            }
        ];
        httpClientSpy.get.and.returnValue(asyncData(expectObj));
        workTimeNoteBackendService.getAll().subscribe(
            val => {
                expect(val).toBe(expectObj);
                done();
            }
        );
    });


    it('getAll should return empty array', (done: DoneFn) => {
        const expectObj = [];
        httpClientSpy.get.and.returnValue(asyncData(expectObj));
        workTimeNoteBackendService.getAll().subscribe(
            val => {
                expect(val).toBe(expectObj);
                done();
            }
        );
    });

    it('getAll should throw error on backned error', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(asyncError(null));
        workTimeNoteBackendService.getAll().subscribe(
            val => {
                fail('should throw error')
                done();
            },
            err => {
                expect().nothing();
                done();
            }
        );
    });

    it('save should return saved object with id', (done: DoneFn) => {
        let obj: WorkTimeNoteBackendModel = {
            id: null,
            type: 'test',
            customer: 'test',
            description: 'test',
            uri: 'test',
            startDate: 'test',
            endDate: 'test',
            spentTimeInMinutes: 1
        }

        httpClientSpy.post.and.returnValue(asyncData({ ...obj, id: 'test' }));

        workTimeNoteBackendService.save(obj).subscribe(
            res => {
                expect(res.id).toBe('test');
                done();
            }
        );
    });

    it('save should throw error on backend error', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(asyncError(null));

        workTimeNoteBackendService.save(<WorkTimeNoteBackendModel>{}).subscribe(
            res => {
                fail('should throw error');
                done();
            },
            err => {
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
