import {jwtDecode} from 'jwt-decode';
import { getCookie } from './cookies';
import { DecodedToken } from './types/DecodedToken';
export const tokenDecode=()=>{
    const token =getCookie("cmu-oauth-token")
    if(token === undefined) return undefined
    const data = jwtDecode<DecodedToken>(token)

    return data
}