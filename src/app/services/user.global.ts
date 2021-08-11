import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

 
@Injectable()
export class UserGlobalService {
	APIUrl: string;
	token: string; 
	constructor(private http: HttpClient) {
		this.APIUrl = environment.apiUrl;
	}
	selectBox(cond) {
		if(cond)
		{
			let tmp = [];
			cond.forEach(function (value) {
		        tmp.push({ id: value.id, itemName: value.name });
			});
			return tmp;
		}
	}
	joinMultiSelect(cond) {
		if(cond)
		{
			let tmp = [];
			cond.forEach(function (value) {
		        tmp.push(value.id);
			});
			return tmp.join();
			// result 1,2,3,4,5
		}
	}
}
