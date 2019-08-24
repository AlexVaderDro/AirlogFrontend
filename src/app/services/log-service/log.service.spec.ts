import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { LogService } from './log.service';
import {MOCK_DATA, MOCK_SOURCE_LIST} from '../../mockdata';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('LogService', () => {
  let logService: LogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService] // todo stub service
    });
    // Returns a service with the MockBackend so we can test with dummy responses
    logService = TestBed.get(LogService);
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('log-service should be created', () => {
    expect(logService).toBeTruthy();
  });

  it('log-service should return a mock', fakeAsync(() => {
    const responce = [
      MOCK_DATA[0],
      MOCK_DATA[3]
    ];

    logService.getLogsByDate('1500000000000', '1500000000010', MOCK_SOURCE_LIST[0], 1, 20);

    tick();

    expect(logService.logs.length).toBe(responce.length);
    expect(logService.logs[0]).toBe(responce[0]);
    expect(logService.logs[1]).toBe(responce[1]);
  }));
});
