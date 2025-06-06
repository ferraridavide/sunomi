/* tslint:disable */
/* eslint-disable */
/**
 * Test swagger
 * Testing the Fastify swagger API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AuthUserUserIdGet200Response
 */
export interface AuthUserUserIdGet200Response {
    /**
     * 
     * @type {string}
     * @memberof AuthUserUserIdGet200Response
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUserUserIdGet200Response
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof AuthUserUserIdGet200Response
     */
    password: string;
}

/**
 * Check if a given object implements the AuthUserUserIdGet200Response interface.
 */
export function instanceOfAuthUserUserIdGet200Response(value: object): value is AuthUserUserIdGet200Response {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('username' in value) || value['username'] === undefined) return false;
    if (!('password' in value) || value['password'] === undefined) return false;
    return true;
}

export function AuthUserUserIdGet200ResponseFromJSON(json: any): AuthUserUserIdGet200Response {
    return AuthUserUserIdGet200ResponseFromJSONTyped(json, false);
}

export function AuthUserUserIdGet200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuthUserUserIdGet200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'username': json['username'],
        'password': json['password'],
    };
}

export function AuthUserUserIdGet200ResponseToJSON(json: any): AuthUserUserIdGet200Response {
    return AuthUserUserIdGet200ResponseToJSONTyped(json, false);
}

export function AuthUserUserIdGet200ResponseToJSONTyped(value?: AuthUserUserIdGet200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'username': value['username'],
        'password': value['password'],
    };
}

