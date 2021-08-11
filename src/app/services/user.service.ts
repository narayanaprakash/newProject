import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// let auth_token = "Bearer "+localStorage.getItem('token');
let auth_token = "Bearer 123";
const httpOptions = {
		headers: new HttpHeaders({})
		// headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })
	// headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': auth_token })
};
const httpOptionsJson = {
	// headers: new HttpHeaders({ 'Content-Type': "application/json;charset=utf-8", 'Authorization': auth_token })
	headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
	// headers: new HttpHeaders({'Access-Control-Allow-Origin': '*' })

};
const httpOptionsFiles = {
	headers: new HttpHeaders({'Content-Type': 'multipart/form-data', 'Authorization': auth_token })
};
 
@Injectable()
export class UserService {
	APIUrl: string;
	constructor(private http: HttpClient) {
		this.APIUrl = environment.apiUrl;
	}
	
	getData(model, url, mode) {
		if(url == "login")
		{
			auth_token = '';
		} 
		if(mode=="POST")
		{ 
			let body = this.serializeObj(model);
			return this.http.post(this.APIUrl + url, body, {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})})
		}
		else if(mode=="JSON")
		{
			return this.http.post(this.APIUrl + url, JSON.stringify(model), httpOptionsJson);
		}
		else if(mode=="PUT")
		{ 
			return this.http.put(this.APIUrl + url, JSON.stringify(model), {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': auth_token})});
		}
		else if(mode=="DELETE")
		{
			return this.http.delete(this.APIUrl + url, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': auth_token})}); 
		}
		else if(mode=="GET")
		{ 
			return this.http.get(this.APIUrl + url, {headers: new HttpHeaders({})})
		}
		else if(mode=="GETT")
		{ 
			return this.http.get(url, {headers: new HttpHeaders({})})
		}
		else if(mode=="GETAllowAnon")
		{ 
			return this.http.get(this.APIUrl + url, {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': auth_token})})
		}
		else if(mode=="POSTUpload")
		{ 
			let body = this.serializeObj(model);
			return this.http.post(this.APIUrl + url, body, {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','Accept': "multipart/form-data"})})
		}
		else if(mode=="MultiUpload")
		{ 
			const headers = new HttpHeaders();
      		headers.append('Content-Type', 'multipart/form-data');
      		headers.append('Accept', 'application/json');
			return this.http.post(this.APIUrl + url, model, { headers: headers})
		}
	} 
	private serializeObj(obj) {
		// var result = [];
		const result = [] as  any;
		for (var property in obj)
			result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
		return result.join("&");
	}
}
