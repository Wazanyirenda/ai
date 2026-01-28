import Link from 'next/link';
import { auth } from '@/lib/auth';
import { SignOutButton } from '@/components/sign-out-button';

const navItems = [
  { href: '/app/projects', label: 'Projects' },
  { href: '/app/templates', label: 'Templates' },
  { href: '/app/affiliate', label: 'Affiliate' },
  { href: '/app/settings', label: 'Settings' }
];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-border bg-white p-6 lg:flex">
          <Link href="/" className="text-lg font-semibold">
            FastCuts
          </Link>
          <nav className="mt-8 flex flex-1 flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="text-xs text-muted-foreground">Premium plan active</div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <p className="text-base font-semibold">{session?.user?.email}</p>
            </div>
            <SignOutButton />
          </header>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
