export function transformDate(date:string) {
    return new Intl.DateTimeFormat('en-US', {
        month: "long",
        day: "numeric",
    }).format(new Date(date))
}