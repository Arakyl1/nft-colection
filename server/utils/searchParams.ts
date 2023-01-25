
export function returnParamsMain(where: object, select?: object) {
    return {
        where: where,
        select: {
            username: true,
            profileImage: true,
            ...select
        }
    }
}

export function returnParamsAditional(select?: object){
    return {
        id: true,
        name: true,
        email: true,
        ...select
    }
}