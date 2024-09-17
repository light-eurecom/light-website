"use client"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Share1Icon, CodeIcon } from "@radix-ui/react-icons"
import { CodeViewer } from "@/components/playground/code-viewer"
import { RoutersSelector } from "@/components/playground/routers-selector"
import { ModelSelector } from "@/components/playground/model-selector"
import { PresetActions } from "@/components/playground/preset-actions"
import { PresetSave } from "@/components/playground/preset-save"
import { SimulationSelector } from "@/components/playground/simulation-selector"
import { PresetShare } from "@/components/playground/preset-share"
import { ClientsSelector } from "@/components/playground/clients-selector"
import { models, types } from "@/components/playground/data/models"
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Logomark } from '@/components/landing/Logo';
import Link from 'next/link';
import { PlaygroundProvider } from '@/context/PlaygroundContext'
import StartSimulation from '@/components/playground/start-simulation'
import { useParams } from 'next/navigation';
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"


export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const params = useParams();
    const simulationId = params.simulation_id as string;

    const { data: simulation, isLoading } = useSWR(simulationId && `http://127.0.0.1:5002/simulations/${simulationId}`, fetcher)

    if (isLoading) return <div className="fixed inset-0 flex items-center animate-pulse justify-center"><div className="flex gap-2 items-center"><Logomark /><span>Loading...</span></div></div>

    return (
        <PlaygroundProvider>
            {/* <HeroPattern /> */}
            <div className="flex-col h-screen w-screen overflow-hidden">
                <div className="p-4 z-50 border-b top-0 right-0 left-0 flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <Link href="/" className='flex'>
                        <div className="flex items-center flex-nowrap gap-3">
                            <Logomark />
                            <span className="font-bold text-2xl">Playground</span>
                        </div>
                    </Link>
                    <div className="ml-auto md:flex hidden w-full space-x-2 sm:justify-end">
                        <SimulationSelector simulationId={simulationId} />
                        {simulationId && <PresetSave />}
                        {simulationId &&
                            <div className="hidden space-x-2 md:flex">
                                <CodeViewer routers={simulation?.routers} />
                                <PresetShare />
                            </div>}
                        <PresetActions />
                    </div>
                </div>
                <Tabs defaultValue="schema" className="flex-1 h-[calc(100vh_-_64px)] overflow-hidden">
                    <div className="grow h-full overflow-hidden">
                        <div className="grid items-stretch sticky top-0 h-full md:grid-cols-[1fr_350px]">
                            <div className="hidden flex-col border-l space-y-4 md:flex md:order-2 p-3">
                                <div className="grid gap-2 p-3">
                                    <HoverCard openDelay={200}>
                                        <HoverCardTrigger asChild>
                                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                Mode
                                            </span>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-[320px] text-sm" side="left">
                                            Choose the interface that best suits your task. You can
                                            provide: a simple prompt to complete, starting and ending
                                            text to insert a completion within, or some text with
                                            instructions to edit it.
                                        </HoverCardContent>
                                    </HoverCard>
                                    <TabsList className="grid grid-cols-2">
                                        <TabsTrigger disabled={!simulationId} value="schema">
                                            <span className="sr-only">Complete</span>
                                            <Share1Icon className="h-5 w-5" />
                                        </TabsTrigger>
                                        <TabsTrigger disabled={!simulationId} value="logs">
                                            <span className="sr-only">Insert</span>
                                            <CodeIcon className="h-5 w-5" />
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <ModelSelector types={types} models={models} />
                                <ClientsSelector defaultValue={[2]} />
                                <RoutersSelector defaultValue={[1]} />
                                <div className="grow flex items-end justify-between">
                                    <ModeToggle />
                                    <StartSimulation />
                                </div>
                            </div>
                            <div className="md:order-1 h-full w-full overflow-hidden">
                                {children}
                            </div>
                        </div>
                    </div>
                </Tabs>
            </div>
        </PlaygroundProvider>
    )
}
