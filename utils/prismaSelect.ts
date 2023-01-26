export function selectUserForCard():object {
    return {
        select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            ranting: true,
            card: true
        },
        
    }
}