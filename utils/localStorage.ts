

export const myGetItem = (key: any) => localStorage.getItem(key)
export const mySetItem = (key: string, elem: any) => localStorage.setItem(key, JSON.stringify(elem))
export const myRemoveItem = (key: string) => localStorage.removeItem(key)