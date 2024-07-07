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
import { ExpenseCategory } from './expenseCategory';
import { Income } from './income';


export interface User { 
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    expenses?: Array<Expense>;
    incomes?: Array<Income>;
    customCategories?: Array<ExpenseCategory>;
}