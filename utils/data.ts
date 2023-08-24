type listRouterLink = { name: string, link: string, nuxtLink: boolean }

export const ROUTE_LINK: readonly listRouterLink[] = [
    { name: 'Home', link: '/', nuxtLink: true },
    { name: 'Activity', link: '/activity', nuxtLink: false },
    { name: 'Category', link: '/category', nuxtLink: false },
    { name: 'Blogs', link: '/blogs', nuxtLink: true },
    { name: 'Add', link: '/add', nuxtLink: true }
]

interface Item {
    id: number,
    active: boolean,
    title: string,
    left: boolean,
    text: string,
    date: string
}
export const ROAD_MAP_LIST = reactive<Item[]>([
    { id: 1, active: false, left: true, title: 'ICO Conducting', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 2, active: false, left: false, title: 'Legal Reviewng', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 3, active: false, left: true, title: 'Trade Enquiries', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 4, active: false, left: false, title: 'Platform Idea', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 5, active: false, left: true, title: 'Project Idea', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 6, active: false, left: false, title: 'Token Sale', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
])