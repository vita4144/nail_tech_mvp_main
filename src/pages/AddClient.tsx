import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';

const AddClient = () => {
  const navigate = useNavigate();
  const { addClient } = useApp();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    preferences: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      toast({
        title: 'Missing information',
        description: 'Please enter client name',
        variant: 'destructive',
      });
      return;
    }

    addClient(formData);
    toast({
      title: 'Client added',
      description: 'New client has been added successfully',
    });
    navigate('/clients');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/clients')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
              <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
            </div>
          </div>

          <h1 className="text-xl font-bold">Add New Client</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">
            Fill in the details to add a new client to your list
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences</Label>
              <Textarea
                id="preferences"
                placeholder="Notes about client preferences..."
                rows={4}
                value={formData.preferences}
                onChange={(e) =>
                  setFormData({ ...formData, preferences: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold">
            Save Client
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default AddClient;
