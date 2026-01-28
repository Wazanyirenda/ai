import { Card, CardContent } from '@/components/ui/card';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-lg items-center justify-center px-6 py-16">
      <Card className="w-full">
        <CardContent className="pt-6">
          <AuthForm title="Welcome back" description="Log in with your email to continue." />
        </CardContent>
      </Card>
    </div>
  );
}
