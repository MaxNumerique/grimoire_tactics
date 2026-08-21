import { HeaderNav } from "@/components/layout/HeaderNav";
import { HeroSection } from "@/components/home/HeroSection";
import { ClassShowcase } from "@/components/home/ClassShowcase";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-painterly-canvas flex flex-col justify-between">
      <div>
        <HeaderNav />
        <main>
          <HeroSection />
          <ClassShowcase />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(212,175,55,0.2)] bg-[#0a0806] py-8 text-center text-xs text-[#8c7e6c]">
      
      </footer>

      <AuthModal />
    </div>
  );
}
