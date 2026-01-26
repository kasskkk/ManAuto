import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Link } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur px-4">
                    <SidebarTrigger className="-ml-1" />

                    <div className="flex flex-1 items-center justify-between">
                        <div className="font-semibold">Name of page</div>
                        <Button asChild variant="default">
                            <Link to="/login">
                                Dev mode Login
                            </Link>
                        </Button>
                        <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">search bar</div>
                            <div className="text-sm">some info</div>
                        </div>
                    </div>
                </header>
                {children}
            </main>
            <Toaster />
        </SidebarProvider>
    )
}