export default () => {
    const initAuth = async() => {
        try {
            await initAccessToken();
            await userGetData()
            reRefrechAccessToken()
        } catch (error) {
            console.log(error);
        }
    }
    return { initAuth }
}