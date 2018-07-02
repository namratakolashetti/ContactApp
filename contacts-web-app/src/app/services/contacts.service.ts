import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  public getContacts(): any {
    return this.http.get<Array<any>[]>(environment.apiBaseUrl + "/contacts/");
  }

  public getContact(id: any): any {
    let params = new HttpParams();
    params = params.set("id", id);
    return this.http.get<Array<any>[]>(environment.apiBaseUrl + "/contacts/", { params: params });
  }

  public addContact(payload: any): any {
    return this.http.post<Array<any>[]>(
      environment.apiBaseUrl + "/contacts/",
      payload
    );
  }

  public updateContact(id: any, payload: any): any {
    return this.http.patch<Array<any>[]>(
      environment.apiBaseUrl + "/contacts/" + id,
      payload
    );
  }

  public deleteContact(id: any): any {
    return this.http.delete<Array<any>[]>(
      environment.apiBaseUrl + "/contacts/" + id
    );
  }
}
