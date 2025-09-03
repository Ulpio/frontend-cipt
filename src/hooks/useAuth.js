import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext.jsx'
export function useAuth(){ return useContext(AuthContext) }