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
import { Expense } from './expense';


export interface ExpenseCategory { 
    id?: string;
    name?: string;
    expenses?: Array<Expense>;
}
