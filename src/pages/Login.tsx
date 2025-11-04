import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import lotusLogo from '@/assets/lotus-logo-pink.png';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin' && password === 'admin') {
      toast({
        title: 'Welcome back!',
        description: 'Login successful',
      });
      navigate('/today');
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials. Try admin/admin',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={lotusLogo} alt="Nail Tech App Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-ptsans font-bold text-primary">Nail Tech App</h1>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Log in</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
            Log in
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button className="text-primary font-medium hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
