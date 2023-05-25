import { request, gql } from 'graphql-request'

export class VideoClient {
    public static async call(query: string) {
        const doc = gql`${query}`
        const resp = await request( "http://localhost:3002", doc)
        console.log(resp)
    }
}