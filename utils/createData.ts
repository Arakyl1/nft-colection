export function createData():object {
    return {
        img: '',
        price: '',
        currency: 'Sel.',
        authorId: 0,
        attributes: { create: [] }
    }
}

export function createBlogData(select?:object):object {
    return {
        img: '',
        authorId: 0,
        title: '',
        text: '',
        ...select
    }
}