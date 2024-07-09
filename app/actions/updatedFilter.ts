"use server"

import { redirect } from "next/navigation"


export const updateFilters = async (formData: FormData) =>{
const queryTextInputFilter = formData.get('query')
const queryTextFilter = formData.get('filter')


if(queryTextInputFilter){
    const params = new URLSearchParams([
        ['query', queryTextInputFilter.toString()]
        
    ])
    return redirect(`/playlist?${params}`)

}
if(queryTextFilter){

    const params = new URLSearchParams([
        ['filter', queryTextFilter.toString()]
    ])

    return redirect(`/playlist?${params}`)

}

redirect('/playlist')

}