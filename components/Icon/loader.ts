import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
      ..._props,
        viewBox: '0 0 50 50',
        class: 'icon__loader',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('circle', {
            class: 'path',
            cx: '25',
            cy: '25',
            r: '20',
            'stroke-width': '5',
            fill: 'none'
        }),
        h('style', {}, [
          `.icon__loader{
            animation: rotate 2s linear infinite;
            width: 50px;
            height: 50px;
          }
          .icon__loader circle{
            stroke: rgb(147, 191, 236);
            stroke-linecap: round;
            animation: dash 1.5s ease-in-out infinite;
          }
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes dash {
            0% {
              stroke-dasharray: 1, 150;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 90, 150;
             stroke-dashoffset: -35;
            }
            100% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -124;
            }
          }`
        ])
      ])
}

