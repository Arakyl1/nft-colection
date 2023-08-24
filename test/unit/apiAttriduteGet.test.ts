import { describe, it, expect } from 'vitest';
import { registerEndpoint } from 'nuxt-vitest/utils'
import func from "@/server/api/attributes/find.get";

describe('Test server Api attridute', () => {
    // it('attridute get', async() => {
    //     const arrTags = [
    //         'Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D'
    //     ]
    //     const { data } = await useFetch('/api/attributes/find', { params: { name: arrTags.join(',')} })
    //     expect(data).toEqual({ data: [], error: null })
    // })
    // const arrTags = ['Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D']
    // const url = new URL('http://www.example.com')
    // url.searchParams.set('name', arrTags.join(','))
    // const request = new Request(url)
    // const event = new FetchEvent('fetch', { request: request })
    it('test', () => {
        // expect(func(request as never)).toEqual(3)
    })
})