import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "./Header";
// import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Right Section */}
        <SidebarInset className="flex flex-col flex-1">
          <Header />

          {/* THIS IS IMPORTANT */}
          <main className="flex-1 p-6 bg-muted/40">
            <Outlet />
          </main>

          {/* <Footer /> */}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
