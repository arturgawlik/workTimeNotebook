export interface Autocomplete {
    types: string[],
    customers: string[],
    descriptions: string[],
    urls: string[]
}

export const initialState: Autocomplete = { types: [], customers: [], descriptions: [], urls: [] } as Autocomplete;
