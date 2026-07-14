import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
export const dynamic = 'force-dynamic';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TooltipProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </TooltipProvider>
    </>
  );
}
