export default () => {
    const { createAccess, reRefrechAccess } = useToken()

    type RegisterData = { email: string, password: string }
    const register = async<T extends RegisterData>(body: T) => { 
        try {
            const { data } = await useFetch('/api/auth/register', {
                method: "POST",
                body: body,
                server: true
            })
            return data.value
        } catch (error: any) {
            console.log(error);
        }
    }

    type LoginData = { username: string, email?: string, password: string }
    const login = async<T extends LoginData>(body: T) => {
        try {
            const { data } = await useFetch('/api/auth/login', {
                method: 'POST',
                body: body,
                server: true
            })
            return data.value
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async() => {    
        try {
           await useFetch('/api/auth/logout', { method: "GET", server: true })
        } catch (error) {
            console.log(error);   
        }
    }

    const data = async<T extends { accessToken: string }>(obj: T) => {
        try {
            const data = await $fetch('/api/auth/user', {
                headers: {
                    method: "GET",
                    Authorization: `Bearer ${obj.accessToken}`,
                },
            })
            return data 
        } catch (error) {
            console.log(error)
        }
    }


    const initAuth = async() => { 
        try {
            // create new Access Token

            const resT = await createAccess();
            if (resT && 'accessToken' in resT && resT.accessToken) {
                // Autorization user by token
                const resU = await data(resT)
                if (resU && 'user' in resU && resU.user) {
                    reRefrechAccess(resT.accessToken)
                }
                return resU 
            } else {
                return resT || null;
            }
        } catch (error) {
            console.log(error);
            return null
        }
    }
    return { login, logout, register, initAuth }
}