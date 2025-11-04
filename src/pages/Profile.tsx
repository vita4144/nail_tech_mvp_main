import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
            <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
          </div>

          <h1 className="text-xl font-bold">Technician Profile</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-accent rounded-full p-8">
              <User className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sarah Wang</h2>
            <p className="text-muted-foreground">
              Future home of technician profile, settings, and salon management
            </p>
          </div>

          <Button onClick={() => navigate('/today')}>
            Back to Today View
          </Button>

          <button
            onClick={() => navigate('/')}
            // THIS LINE IS NOW FIXED:
            className="text-primary hover:underline font-medium block mx-auto mt-4"          >
            Log out
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
