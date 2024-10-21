const apiBaseUrl = 'https://swapi.dev/api/'

export const apiPeopleUrl = `${apiBaseUrl}people/`
export const apiPersonUrl = (id: string) => `${apiPeopleUrl}/${id}/`
