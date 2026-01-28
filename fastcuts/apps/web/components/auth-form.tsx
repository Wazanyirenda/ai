'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AuthForm({ title, description }: { title: string; description: string }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await signIn('email', {
      email,
      callbackUrl: '/app/projects'
    });
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Input
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Button type="submit" size="lg" disabled={isLoading}>
        {isLoading ? 'Sending magic link…' : 'Send magic link'}
      </Button>
    </form>
  );
}
