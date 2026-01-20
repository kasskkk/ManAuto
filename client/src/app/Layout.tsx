import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="w-full">
                <div className="grid grid-cols-4 gap-4">
                    <SidebarTrigger />
                    <div>Name of page</div>
                    <div>search bar</div>
                    <div>some info</div>
                </div>
                <Separator className="my-4" />
                {children}
            </main>
        </SidebarProvider>
    )
}