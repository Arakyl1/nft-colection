import jwtDecode from "jwt-decode";

export const reRefrechAccess = () => {
    const { accessToken } = useAccessToken();
    if (!accessToken.value) {
        return
    }
    const jwt = jwtDecode(accessToken.value)
    
    const newRefrecmTime = jwt.exp - 60000
    setTimeout(() => {
        initAccessToken()
        reRefrechAccess()
    }, newRefrecmTime)
    
}