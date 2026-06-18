import Image from "next/image";
import Link from "next/link";
import HomeClient from "./HomeClient";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl items-start justify-center gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <aside className="hidden min-w-[160px] lg:sticky lg:top-8 lg:block lg:self-start">
        <div className="flex h-[600px] w-[160px] items-center justify-center rounded-lg bg-card-bg text-sm text-card-text">
          Espaço para Anúncio (AdSense)
        </div>
      </aside>

      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <header className="text-center relative">
          <ThemeToggle />
          <Image src="/logo.webp" alt="Logo Qual o Tom App" width={80} height={80} className="mx-auto mb-4 rounded-xl" priority />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Qual o Tom App
          </h1>
          <p className="mt-1 text-sm text-card-text sm:text-base">
            Seu mapa de campo harmônico e progressões
          </p>
        </header>

        <div className="flex min-h-[90px] w-full max-w-[728px] items-center justify-center rounded-lg bg-card-bg text-sm text-card-text lg:hidden">
          Espaço para Anúncio (AdSense)
        </div>

        <HomeClient />

        <div className="flex min-h-[90px] w-full max-w-[728px] items-center justify-center rounded-lg bg-card-bg text-sm text-card-text lg:hidden">
          Espaço para Anúncio (AdSense)
        </div>

        <footer className="text-card-text text-xs py-8 border-t border-border-color mt-12 text-center w-full">
          <span>© 2026 Qual o Tom App. Todos os direitos reservados.</span>
          <Link href="/politica-de-privacidade" className="hover:text-orange-500 underline ml-4">
            Política de Privacidade
          </Link>
        </footer>
      </div>

      <aside className="hidden min-w-[160px] lg:sticky lg:top-8 lg:block lg:self-start">
        <div className="flex h-[600px] w-[160px] items-center justify-center rounded-lg bg-card-bg text-sm text-card-text">
          Espaço para Anúncio (AdSense)
        </div>
      </aside>
    </div>
  );
}
