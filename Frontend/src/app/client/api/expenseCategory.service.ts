/**
 * ProjektZespolowy-WSIZ
 * This is ProjektZespolowy-WSIZ API contract
 *
 * OpenAPI spec version: 1.1.0
 * Contact: apiteam@swagger.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ExpenseCategory } from '../model/expenseCategory';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {

        if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Create a new expense category
     * Create a new expense category
     * @param expenseCategory Expense category object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createExpenseCategory(expenseCategory: ExpenseCategory, observe?: 'body', reportProgress?: boolean): Observable<ExpenseCategory>;
    public createExpenseCategory(expenseCategory: ExpenseCategory, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ExpenseCategory>>;
    public createExpenseCategory(expenseCategory: ExpenseCategory, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ExpenseCategory>>;
    public createExpenseCategory(expenseCategory: ExpenseCategory, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (expenseCategory === null || expenseCategory === undefined) {
            throw new Error('Required parameter expenseCategory was null or undefined when calling createExpenseCategory.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<ExpenseCategory>(`${this.configuration.basePath}/expense-categories`,
            expenseCategory,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Delete an expense category by ID
     * Delete an expense category by its ID
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteExpenseCategory(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteExpenseCategory(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteExpenseCategory(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteExpenseCategory(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteExpenseCategory.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.configuration.basePath}/expense-categories/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all expense categories
     * Retrieve a list of all expense categories
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getExpenseCategories(observe?: 'body', reportProgress?: boolean): Observable<Array<ExpenseCategory>>;
    public getExpenseCategories(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ExpenseCategory>>>;
    public getExpenseCategories(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ExpenseCategory>>>;
    public getExpenseCategories(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<ExpenseCategory>>(`${this.configuration.basePath}/expense-categories`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get an expense category by ID
     * Retrieve an expense category by its ID
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getExpenseCategory(id: string, observe?: 'body', reportProgress?: boolean): Observable<ExpenseCategory>;
    public getExpenseCategory(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ExpenseCategory>>;
    public getExpenseCategory(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ExpenseCategory>>;
    public getExpenseCategory(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getExpenseCategory.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<ExpenseCategory>(`${this.configuration.basePath}/expense-categories/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update an expense category by ID
     * Update an expense category by its ID
     * @param id 
     * @param expenseCategory Updated expense category object
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateExpenseCategory(id: string, expenseCategory: ExpenseCategory, observe?: 'body', reportProgress?: boolean): Observable<ExpenseCategory>;
    public updateExpenseCategory(id: string, expenseCategory: ExpenseCategory, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ExpenseCategory>>;
    public updateExpenseCategory(id: string, expenseCategory: ExpenseCategory, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ExpenseCategory>>;
    public updateExpenseCategory(id: string, expenseCategory: ExpenseCategory, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateExpenseCategory.');
        }
        if (expenseCategory === null || expenseCategory === undefined) {
            throw new Error('Required parameter expenseCategory was null or undefined when calling updateExpenseCategory.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<ExpenseCategory>(`${this.configuration.basePath}/expense-categories/${encodeURIComponent(String(id))}`,
            expenseCategory,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
