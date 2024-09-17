import {QueryClient} from '@tanstack/react-query';

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60*1000,
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
    if(typeof window === 'undefined'){

        // server: always make a new query client
        return makeQueryClient()
    }else {


        if(!browserQueryClient) browserQueryClient = makeQueryClient()
            return browserQueryClient
    }
}