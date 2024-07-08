"use server"

import { redirect } from "next/navigation"


export const updateFilters = async (formData: FormData) =>{
const textInputFilter = formData.get('query')

console.log(textInputFilter, 'textInput')
if(textInputFilter){
    const params = new URLSearchParams([
        ['query', textInputFilter.toString()]
    ])

    redirect(`/playlist?${params}`)

}

redirect('/playlist')

}