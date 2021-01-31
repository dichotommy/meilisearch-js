type Hit<T> = T & { _formatted?: Partial<T> }

interface SearchParams<T> {
    attributesToRetrieve?: Array<Extract<keyof T, string> | '*'>
}

export type SingleAttrToRetrieve<T, K> = K extends '*' ? Array<Hit<T>> : Array<Hit<Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>>> :

export type Hits<
  T,
  P extends SearchParams<T>
> = P['attributesToRetrieve'] extends Array<infer K> // if P['attributesToRetrieve'] is an array, we use `infer K` to extract the keys in the array in place
  ? SingleAttrToRetrieve<T, K> // Same extraction method as above when we have a single `attributesToRetrieve`
  : Array<Hit<T>> // Finally return the full type as `attributesToRetrieve` is neither a single key nor an array of keys

interface SearchResponse<T, P extends SearchParams<T>> {
  hits: Hits<T,P>
}

type Movie = {
    id:number,
    title:string
    description: string
}

const params: SearchParams<Movie> = {
    // attributesToRetrieve: ['id', 'description', 'title']
    attributesToRetrieve: ['*']
}

const response: SearchResponse<Movie, typeof params> = {

    hits: [ {
        'id':1,
        'title': 'he',
        'description': 'ha',
        _formatted: {
            'id':1,
        }
    }]
}

type MovieWithOptionalField = {
    id:number,
    title:string
    description?: string
}

const params2: SearchParams<MovieWithOptionalField> = {
    attributesToRetrieve: ['id', 'description', 'title']
}

const response2: SearchResponse<MovieWithOptionalField, typeof params2> = {
    hits:[{
        description:'',
        title:'',
        id:1,
        _formatted:{
            description:'',
            title:'',
            id:1
        }
    }]
}
