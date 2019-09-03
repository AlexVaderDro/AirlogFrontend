import {LogService} from './log.service';
import {MOCK_DATA, MOCK_SOURCE_LIST} from '../../mockdata';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {defer} from 'rxjs';
import * as FileSaver from 'file-saver';


export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('LogService', () => {
  let logService: LogService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    const response = 100500;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpClientSpy.get.and.returnValue(asyncData(response));
    logService = new LogService(httpClientSpy as any);
  });

  it('log-service should be created', () => {
    expect(logService).toBeTruthy();
  });

  describe('createLink(id)', () => {
    it('should return a link', () => {
      const id = 10;
      expect(logService.createLink(id)).toBe(`${environment.frontendUrl}/table` +
        `?id=${id}&source=${logService.currentSource}&start=${logService.dateStart}` +
        `&end=${logService.dateEnd}&page=${logService.currentPage}`);
    });
  });

  describe('getTotalItems()', () => {
    it('should return total items', () => {
      const expectedResponse = 100500;
      httpClientSpy.get.and.returnValue(asyncData(expectedResponse));
      logService.getTotalItems().subscribe(num => expect(num).toBe(expectedResponse));
      expect(httpClientSpy.get.calls.count()).toBe(2);
    });
  });

  describe('getSources()', () => {
    it('should return sources', () => {
      const expectedResponse = MOCK_SOURCE_LIST;
      httpClientSpy.get.and.returnValue(asyncData(expectedResponse));
      logService.getSources().subscribe(sources => expect(sources).toEqual(expectedResponse));
      expect(httpClientSpy.get.calls.count()).toBe(2);
    });
  });

  describe('getLogs()', () => {
    it('should get logs', () => {
      const totalItems = 100500;
      const expectedLogs = MOCK_DATA;
      httpClientSpy.get.and.returnValues(asyncData(totalItems), asyncData(expectedLogs));
      logService.getLogs();
      setTimeout(() => {
        expect(logService.logs).toEqual(expectedLogs);
      }, 1000);
      expect(httpClientSpy.get.calls.count()).toBe(2);
    });
  });

  describe('save()', () => {
    it('should save a file with a given text', () => {
      const expectedData = 'some text'; // MOCK_DATA.toString();
      httpClientSpy.get.and.returnValue(asyncData(expectedData));
      spyOn(FileSaver, 'saveAs').and.stub().and.returnValue(expectedData);
      logService.save();
      expect(FileSaver.saveAs()).toEqual(expectedData);
    });
  });
});
