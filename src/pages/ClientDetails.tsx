import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Phone, Ban, Pencil, Check, X } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getClientById, getAppointmentsByClientId, banClient, deleteClient, updateClient } = useApp();
  const { toast } = useToast();
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState('');

  const client = id ? getClientById(id) : null;
  const appointments = id ? getAppointmentsByClientId(id) : [];

  if (!client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Client not found</p>
      </div>
    );
  }

  const nextAppointment = appointments.find(
    (apt) => new Date(apt.date) >= new Date() && apt.status !== 'canceled'
  );
  const clientHistory = appointments
    .filter((apt) => apt.status === 'completed')
    .slice(0, 5);

  const handleBanClient = () => {
    banClient(client.id);
    toast({
      title: 'Client banned',
      description: `${client.firstName} ${client.lastName} has been banned`,
      variant: 'destructive',
    });
  };

  const handleDeleteClient = () => {
    deleteClient(client.id);
    toast({
      title: 'Client deleted',
      description: 'Client and all associated appointments have been removed',
    });
    navigate('/clients');
  };

  const handleEditPreferences = () => {
    setEditedPreferences(client.preferences || '');
    setIsEditingPreferences(true);
  };

  const handleSavePreferences = () => {
    updateClient(client.id, { preferences: editedPreferences });
    setIsEditingPreferences(false);
    toast({
      title: 'Preferences updated',
      description: 'Client preferences have been saved',
    });
  };

  const handleCancelEdit = () => {
    setIsEditingPreferences(false);
    setEditedPreferences('');
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

          <h1 className="text-xl font-bold">Client Details</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {client.firstName} {client.lastName}
              </h2>
              {client.isBanned && (
                <Badge variant="destructive" className="gap-1">
                  <Ban className="h-3 w-3" />
                  BANNED
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phone || 'No phone'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email || 'No email'}</span>
            </div>
          </div>
        </div>

        {nextAppointment && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Next Appointment
            </h3>
            <div className="space-y-1">
              <p className="font-medium">
                {format(new Date(nextAppointment.date), 'MMMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground">
                {nextAppointment.time}
              </p>
            </div>
          </div>
        )}

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-3">Client History</h3>
          {clientHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">No completed appointments yet</p>
          ) : (
            <div className="space-y-3">
              {clientHistory.map((apt) => (
                <div key={apt.id} className="border-l-2 border-primary pl-3 py-1">
                  <p className="font-medium text-sm">
                    {apt.notes || 'Service completed'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(apt.date), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Preferences</h3>
            {!isEditingPreferences && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditPreferences}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          {isEditingPreferences ? (
            <div className="space-y-3">
              <Textarea
                value={editedPreferences}
                onChange={(e) => setEditedPreferences(e.target.value)}
                placeholder="Add client preferences..."
                className="min-h-[100px]"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {client.preferences || 'No preferences set'}
            </p>
          )}
        </div>

        <div className="space-y-3 pt-4">
          {!client.isBanned && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Ban className="h-4 w-4 mr-2" />
                  Ban Client
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ban this client?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will mark the client as banned and cancel all future
                    appointments. This action can be reversed.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBanClient}>
                    Ban Client
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Delete Client
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this client?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the client and all associated
                  appointments. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteClient}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate('/clients')}
          >
            Back to Client List
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientDetails;
