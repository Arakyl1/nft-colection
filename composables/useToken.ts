import jwtDecode, { JwtPayload } from "jwt-decode";

export default () => {

    const createAccess = async () => {
        try {
            const headers = useRequestHeaders(['cookie']);
            console.log(headers)
            const { data, error } = await useFetch('/api/auth/refrech', { headers })            
            
            return data.value
        } catch (error) {
            console.log('error create token', error, process.client);
        }
    }

    const reRefrechAccess = (_accessToken: string) => {
        
        interface JwtD extends JwtPayload{
            id: PropertyKey,
            exp: number
        }
        const jwt = jwtDecode<JwtD>(_accessToken)

        const newRefrecmTime = jwt.exp - 60000
        setTimeout(async() => {
            const res = await createAccess()
            if (res && 'accessToken' in res && res.accessToken) {
                reRefrechAccess(res.accessToken)
            } else if(res && 'message' in res && res.message){
                console.log(res.message)
            }
        }, newRefrecmTime)

    }
    return { createAccess, reRefrechAccess }
}