// import { useId } from 'react'

// export function HeroPattern() {
//     return (
//         <div className="absolute -z-[500] inset-0 mx-0 max-w-none opacity-50 dark:opacity-100 overflow-hidden">
//             <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:opacity-100">
//                     <GridPattern
//                         width={72}
//                         height={56}
//                         x={-12}
//                         y={4}
//                         squares={[
//                             [4, 3],
//                             [2, 1],
//                             [7, 3],
//                             [10, 6],
//                         ]}
//                         className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
//                     />
//                 </div>
//                 <svg
//                     viewBox="0 0 1113 440"
//                     aria-hidden="true"
//                     className="absolute -z-1 left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-base-100 blur-[26px] dark:hidden"
//                 >
//                     <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
//                 </svg>
//             </div>
//         </div>
//     )
// }


// export function GridPattern({
//     width,
//     height,
//     x,
//     y,
//     squares,
//     ...props
// }) {
//     let patternId = useId()

//     return (
//         <svg aria-hidden="true" {...props}>
//             <defs>
//                 <pattern
//                     id={patternId}
//                     width={width}
//                     height={height}
//                     patternUnits="userSpaceOnUse"
//                     x={x}
//                     y={y}
//                 >
//                     <path d={`M.5 ${height}V.5H${width}`} fill="none" />
//                 </pattern>
//             </defs>
//             <rect
//                 width="100%"
//                 height="100%"
//                 strokeWidth={0}
//                 fill={`url(#${patternId})`}
//             />
//             {squares && (
//                 <svg x={x} y={y} className="overflow-visible">
//                     {squares.map(([x, y]) => (
//                         <rect
//                             strokeWidth="0"
//                             key={`${x}-${y}`}
//                             width={width + 1}
//                             height={height + 1}
//                             x={x * width}
//                             y={y * height}
//                         />
//                     ))}
//                 </svg>
//             )}
//         </svg>
//     )
// }

import { useId } from 'react'

export function HeroPattern() {
    return (
        <div className="absolute -z-[500] inset-0 mx-0 max-w-none opacity-50 dark:opacity-100 overflow-hidden">
            <div className="absolute left-1/2 top-0 ml-[-38rem] h-[25rem] w-[81.25rem] dark:[mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/30 opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:opacity-100">
                    <GridPattern
                        width={10}
                        height={10}
                        x={0}
                        y={0}
                        squares={[
                            [4, 3],
                            [2, 1],
                            [7, 3],
                            [10, 6],
                        ]}
                        className="absolute inset-x-0 inset-y-[-50%] h-[200%] w-full skew-y-[-18deg] fill-black/40 stroke-black/50 mix-blend-overlay dark:fill-white/2.5 dark:stroke-white/5"
                    />
                </div>
                {/* <svg
                    viewBox="0 0 1113 440"
                    aria-hidden="true"
                    className="absolute -z-1 left-1/2 top-0 ml-[-19rem] w-[69.5625rem] fill-base-100 blur-[26px] dark:hidden"
                >
                    <path d="M.016 439.5s-9.5-300 434-300S882.516 20 882.516 20V0h230.004v439.5H.016Z" />
                </svg> */}
            </div>
        </div>
    )
}


export function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}: {
    width: number,
    height: number,
    x: number,
    y: number,
    squares: Array<[number, number]>
} & any) {
    let patternId = useId()

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <circle cx={width / 2} cy={height / 2} r={1} fill="black" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: [number, number]) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    )
}