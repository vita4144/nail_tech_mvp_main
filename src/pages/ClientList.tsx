import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, UserPlus } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import { format } from 'date-fns';

const ClientList = () => {
  const navigate = useNavigate();
  const { clients, getAppointmentsByClientId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const getNextAppointment = (clientId: string) => {
    const appointments = getAppointmentsByClientId(clientId);
    const futureAppointments = appointments.filter(
      (apt) => new Date(apt.date) >= new Date()
    );
    return futureAppointments[0];
  };

  const getLastAppointment = (clientId: string) => {
    const appointments = getAppointmentsByClientId(clientId);
    const pastAppointments = appointments.filter(
      (apt) => new Date(apt.date) < new Date()
    );
    return pastAppointments[0];
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
              <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/clients/new')}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>

          <h1 className="text-xl font-bold mb-4">My Clients</h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
            <Input
              type="search"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => {
              const nextApt = getNextAppointment(client.id);
              const lastApt = getLastAppointment(client.id);

              return (
                <div
                  key={client.id}
                  className="bg-card rounded-xl border border-border p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <button
                      onClick={() => navigate(`/clients/${client.id}`)}
                      className="flex-1 text-left hover:opacity-80 transition-opacity"
                    >
                      <h3 className="font-semibold text-lg mb-1">
                        {client.firstName} {client.lastName}
                        {client.isBanned && (
                          <span className="ml-2 text-destructive text-sm font-normal">
                            Banned
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {nextApt
                          ? `Next: ${format(new Date(nextApt.date), 'MMM d, yyyy')} at ${nextApt.time}`
                          : lastApt
                          ? `Last: ${format(new Date(lastApt.date), 'MMM d, yyyy')}`
                          : 'Not scheduled yet'}
                      </p>
                    </button>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() =>
                        navigate('/appointments/new', {
                          state: { clientId: client.id },
                        })
                      }
                      className="shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientList;
