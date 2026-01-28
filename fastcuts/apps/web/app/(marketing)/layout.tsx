import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AffiliateTracker } from '@/components/affiliate-tracker';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AffiliateTracker />
      <header className="sticky top-0 z-30 border-b border-border/60 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold">
            FastCuts
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-foreground">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border/60 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
          <span>© 2024 FastCuts. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-foreground">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
