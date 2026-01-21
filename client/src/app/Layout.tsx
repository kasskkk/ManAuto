import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />

                    {/* Ten kontener zajmuje całą szerokość i układa elementy */}
                    <div className="flex flex-1 items-center justify-between">
                        <div className="font-semibold">Name of page</div>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">search bar</div>
                            <div className="text-sm">some info</div>
                        </div>
                    </div>
                </header>
                {children}
            </main>
        </SidebarProvider>
    )
}