export function selectUserForCard(select?:object):object {
    return {
        select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            ...select
        },
        
    }
}

export function selectNFTCard(select?:object):object {
    return {
        select: {
            id: true,
            img: true,
            price: true,
            currency: true,
            quantity: true,
            ...select
        },
        
    }
}

export function selectBlogCard(select?:object):object {
    return {
        select: {
            id: true,
            img: true,
            text: true,
            title: true,
            date: true,
            ...select
        },
        
    }
}