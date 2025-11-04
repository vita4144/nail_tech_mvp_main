import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import nailHero from '@/assets/nail-hero.jpg';
import lotusLogo from '@/assets/lotus-logo-pink.png';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={nailHero}
              alt="Professional nail art"
              className="w-48 h-48 rounded-3xl object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <img src={lotusLogo} alt="Nail Tech App Logo" className="h-10 w-10" />
            <h1 className="text-3xl font-ptsans font-bold text-primary">Nail Tech App</h1>
          </div>
          
          <p className="text-muted-foreground">
            Easily manage your clients, schedule appointments, track client preferences, and grow
            your nail business
          </p>
        </div>

        <Button
          onClick={() => navigate('/login')}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          Log in
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New to Nail Tech App?{' '}
          <button className="text-primary font-medium hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
