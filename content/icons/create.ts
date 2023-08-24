import { iconPath } from "./1";
import { SVGAttributes } from "nuxt/dist/app/compat/capi";

export type NameIcon = keyof typeof iconPath

interface Flavoring<FlavorT> {
    _type?: FlavorT;
}
export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>;

type width = Flavor<number, 'Width'>
type height = number & {readonly brand: unique symbol} 
interface Props {
    viewBox?: string,
    name: `${NameIcon}_${width}_${height}`,
    att?: SVGAttributes
  }

// {par: createIconArg, path: T | T[]}
export default defineComponent({
    setup (props: Props, { attrs }) {
        interface PD extends Props, Data {}
        const _elem = attrs as unknown as PD
        let params = _elem.name.split('_') as unknown as [NameIcon,string,string]
        let iconData = iconPath[params[0]]
        let iconDataAttr = iconData && 'other' in iconData ? iconData.other : {}
        return () => h('svg', {
            xmlns:"http://www.w3.org/2000/svg",
            fill: "none",
            width: params[1],
            height: params[2],
            viewBox: _elem.viewBox || iconData.viewBox || ''
        },[
            h('g',{ ...iconDataAttr, ... _elem.att }, [
                iconData && 'path' in iconData && Array.isArray(iconData.path) ?
                iconData.path.map(_ => (h('path', _ ))) :
                null,
                iconData && 'line' in iconData && Array.isArray(iconData.line) ?
                iconData.line.map(_ => (h('line', _ ))) :
                null,
                iconData && 'circle' in iconData && Array.isArray(iconData.circle) ?
                iconData.circle.map(_ => (h('circle', _ ))) :
                null,
                
            ].flat(1) )
        ] )
    }
})
