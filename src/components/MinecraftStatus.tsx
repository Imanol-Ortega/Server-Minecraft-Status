import { getStatus } from "@/services/ApiService"
import type { APIMC } from "@/types/interfaces"
import { useEffect, useState } from "react"
import SpanLine from "./SpanLine"
import {Loading} from "@/iconos/Loading.tsx"
function MinecraftStatus() {
    const [status,setStatus] = useState<APIMC | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(()=>{
        const getData = async()=>{
            try {
                const tp = await getStatus();
                setStatus(tp)
                setIsLoading(true)
                console.log(status?.players.list)
            } catch (error) {
                console.error(error) 
            }
        }
        getData()
    },[])
  return (
    <div className="h-full flex">
        <div className="dark:bg-neutral-900 dark:text-white overflow-x-hidden scroll-smooth w-[900px] h-[800px] m-auto p-10">
            <section>
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <hgroup>
                        <h1 className="text-4xl font-sans font-semibold">Minecraft Server Status</h1>
                        <p className="text-base font-light p-1 mt-2">Recupera rápidamente el estado de cualquier servidor de Minecraft</p>
                    </hgroup>
                </div>
            </section>
            <section>
                {isLoading ? (
                    <div className="rounded block p-2 mt-3">
                        <ul className="list-none">
                            <SpanLine title="Estado" description={status?.online?"Online":"Offline"}  classDesc="text-sm rounded px-2 py-1 bg-green-700 text-white text-opacity-100 bg-opacity-100"/>
                            <SpanLine title="Host" description={status?.host} classDesc=""/>
                            <SpanLine title="Puerto" description={status?.port} classDesc=""/>
                            {status?.online && (
                                <>
                                    <SpanLine title="MOTD" description={status?.motd.raw} classDesc="block bg-black rounded text-white p-5 w-full overflow-x-auto "/>
                                    <SpanLine title="Versión" description={status?.version.name_clean} classDesc=""/>
                                    <SpanLine title="Jugadores" description={`${status?.players.online}/${status?.players.max}`} classDesc="text-red-700"/>
                                    { status.players.online != 0 && 
                                        <div className="block">
                                            <pre className="blok bg-black rounded text-white p-5 w-full overflow-x-auto mt-3 flex flex-row justify-start flex-wrap">
                                                {
                                                    status.players.list.map((player) => (
                                                        <span className="text-sm rounded px-2 py-1 bg-lime-800 text-white text-opacity-100 bg-opacity-100" key={player.uuid}>{player.name_clean}</span>
                                                    ))
                                                }
                                            </pre>
                                        </div>
                                    }
                                    <SpanLine title="Mods" description="YES" classDesc="" />
                                    <SpanLine title="Plugins" description="N/A" classDesc=""/>
                                </>
                            )}
                        </ul>
                    </div>     
                ): 
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Loading />
                    </div>
                }
            </section>
        </div>
    </div>
        
  )
}
export default MinecraftStatus
