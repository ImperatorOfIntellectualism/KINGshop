import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(text => {
        if(text){
            document.getElementById("error").innerHTML = text
        }
    }, [])
}