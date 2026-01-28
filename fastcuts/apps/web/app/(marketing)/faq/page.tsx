import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FaqPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>Answers for the most common questions. More coming soon.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            FastCuts is currently in private beta. We&apos;re onboarding teams weekly.
          </p>
          <Button asChild size="lg">
            <Link href="/signup">Request access</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
