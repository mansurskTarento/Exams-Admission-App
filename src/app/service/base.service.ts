import { Injectable } from '@angular/core';
import { HttpService } from "../core/services/http-service/http.service";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BaseService extends HttpService {

  override baseUrl: string;
  headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer `
  };
  
  private userData = new BehaviorSubject({})
  currentUserData = this.userData.asObservable();


  constructor(private httpClient: HttpClient, cookieService: CookieService
  ) {
    super(httpClient, cookieService);
    this.baseUrl = environment.apiUrl;
  }
  

  getHallTickets$(): Observable<any> {
    // return this.httpClient.get<any>("https://api.agify.io/?name=meelad");

    return of(
      [
        {
          id: 0,
          name: "Vidhu",
          course: "BSC GNM",
          rollNo: "2020",
          attendancePercentage: "3",
          hasStyle: true,
          cellStyle: {
            viewHallTicket: {
              'color': '#0074B6'
            }
          }
        },
        {
          id: 0,
          name: "Vidhu",
          course: "BSC GNM",
          rollNo: "2020",
          attendancePercentage: "3",
          hasStyle: true,
          cellStyle: {
            viewHallTicket: {
              'color': '#0074B6'
            }
          }
        },
        {
          id: 0,
          name: "Vidhu",
          course: "BSC GNM",
          rollNo: "2020",
          attendancePercentage: "3",
          hasStyle: true,
          cellStyle: {
            viewHallTicket: {
              'color': '#0074B6'
            }
          }
        },
        {
          id: 0,
          name: "Vidhu",
          course: "BSC GNM",
          rollNo: "2020",
          attendancePercentage: "3",
          hasStyle: true,
          cellStyle: {
            viewHallTicket: {
              'color': '#0074B6'
            }
          }
        },
      ]
    )
  }

  generateHallTkt$(): Observable<any> {
    // return this.httpClient.get<any>("https://api.agify.io/?name=meelad");

    return of([])
  }

  getInstitutesData$(): Observable<any> {
    // return this.httpClient.get<any>("https://api.agify.io/?name=meelad");

    return of(  [
      {
        instituteName: 'NEW COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided: true,
        finalMarksProvided: true,
        revisedFinalMarksProvided: true,
       
      },
      {
        instituteName: 'OLD COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided:false,
        finalMarksProvided: true,
        revisedfinalMarksProvided: false,
     
      },
      {
        instituteName: 'MODERN COLLEGE OF NURSING',
        instituteId: '123',
        course: 'xxxx',
        internalMarksProvided: true,
        finalMarksProvided: false,
        revisedfinalMarksProvided: true,
    
      },
    
   
    ])
  }

  getUserData$(): Observable<any>{
    return of([
      {
        fullName: 'Devaprathap Nagendra',
        email: 'name@gmail.com',
        phoneNumber: '9765454333',
        role: 'Institute',
        accountStatus: 'Active',
        hasStyle: true,
        cellStyle: {
          viewExamCycle: {
            'color': '#0074B6'
          }
        }
      },
      {
        fullName: 'D. Nagendra',
        email: 'name@gmail.com',
        phoneNumber: '9765454333',
        role: 'Admin',
        accountStatus: 'Active',
        hasStyle: true,
        cellStyle: {
          viewExamCycle: {
            'color': '#0074B6'
          }
        }
      },
  ])
  }

  setUserData(userData:any){
    this.userData.next(userData)
  }

}
