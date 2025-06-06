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
import type { VideoVideoIdGet200ResponseCommentsInnerUser } from './VideoVideoIdGet200ResponseCommentsInnerUser';
import {
    VideoVideoIdGet200ResponseCommentsInnerUserFromJSON,
    VideoVideoIdGet200ResponseCommentsInnerUserFromJSONTyped,
    VideoVideoIdGet200ResponseCommentsInnerUserToJSON,
    VideoVideoIdGet200ResponseCommentsInnerUserToJSONTyped,
} from './VideoVideoIdGet200ResponseCommentsInnerUser';

/**
 * 
 * @export
 * @interface VideoVideoIdGet200ResponseCommentsInner
 */
export interface VideoVideoIdGet200ResponseCommentsInner {
    /**
     * 
     * @type {string}
     * @memberof VideoVideoIdGet200ResponseCommentsInner
     */
    id: string;
    /**
     * 
     * @type {VideoVideoIdGet200ResponseCommentsInnerUser}
     * @memberof VideoVideoIdGet200ResponseCommentsInner
     */
    user: VideoVideoIdGet200ResponseCommentsInnerUser;
    /**
     * 
     * @type {string}
     * @memberof VideoVideoIdGet200ResponseCommentsInner
     */
    text: string;
    /**
     * 
     * @type {Date}
     * @memberof VideoVideoIdGet200ResponseCommentsInner
     */
    timeStamp: Date;
}

/**
 * Check if a given object implements the VideoVideoIdGet200ResponseCommentsInner interface.
 */
export function instanceOfVideoVideoIdGet200ResponseCommentsInner(value: object): value is VideoVideoIdGet200ResponseCommentsInner {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('user' in value) || value['user'] === undefined) return false;
    if (!('text' in value) || value['text'] === undefined) return false;
    if (!('timeStamp' in value) || value['timeStamp'] === undefined) return false;
    return true;
}

export function VideoVideoIdGet200ResponseCommentsInnerFromJSON(json: any): VideoVideoIdGet200ResponseCommentsInner {
    return VideoVideoIdGet200ResponseCommentsInnerFromJSONTyped(json, false);
}

export function VideoVideoIdGet200ResponseCommentsInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): VideoVideoIdGet200ResponseCommentsInner {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'user': VideoVideoIdGet200ResponseCommentsInnerUserFromJSON(json['user']),
        'text': json['text'],
        'timeStamp': (new Date(json['timeStamp'])),
    };
}

export function VideoVideoIdGet200ResponseCommentsInnerToJSON(json: any): VideoVideoIdGet200ResponseCommentsInner {
    return VideoVideoIdGet200ResponseCommentsInnerToJSONTyped(json, false);
}

export function VideoVideoIdGet200ResponseCommentsInnerToJSONTyped(value?: VideoVideoIdGet200ResponseCommentsInner | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'user': VideoVideoIdGet200ResponseCommentsInnerUserToJSON(value['user']),
        'text': value['text'],
        'timeStamp': ((value['timeStamp']).toISOString()),
    };
}

