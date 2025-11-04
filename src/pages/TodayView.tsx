import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, Edit2 } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp, AppointmentStatus } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { format, addDays, subDays } from 'date-fns';

const statusTextColors: Record<AppointmentStatus, string> = {
  booked: 'text-primary border-primary',
  completed: 'text-success border-success',
  canceled: 'text-muted-foreground border-muted-foreground',
  banned: 'text-destructive border-destructive',
};

const TodayView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointments, getClientById, getAppointmentsByDate } = useApp();
  const [currentDate, setCurrentDate] = useState(() => {
    const stateDate = location.state?.date;
    if (stateDate) {
      // Parse the date string as local date to avoid timezone issues
      const [year, month, day] = stateDate.split('-').map(Number);
      return new Date(year, month - 1, day); // month is 0-indexed in JS
    }
    return new Date();
  });

  const dateString = format(currentDate, 'yyyy-MM-dd');
  const todayAppointments = getAppointmentsByDate(dateString);

  const handlePrevDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  const isToday = format(new Date(), 'yyyy-MM-dd') === dateString;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
              <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setCurrentDate(new Date())}
            >
              <Calendar className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevDay}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <h1 className="text-lg font-semibold">
              {isToday ? 'Today' : format(currentDate, 'EEEE')}, {format(currentDate, 'MMMM d')}
            </h1>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextDay}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {todayAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No appointments scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todayAppointments.map((appointment) => {
              const client = getClientById(appointment.clientId);
              if (!client) return null;

              return (
                <div
                  key={appointment.id}
                  className="w-full rounded-xl border-2 border-border bg-card p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                      className="flex-1 min-w-0 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">
                          {appointment.time}
                        </span>
                        <Badge variant="outline" className={`capitalize text-xs ${statusTextColors[appointment.status]}`}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">
                        {client.firstName} {client.lastName}
                      </h3>
                      {appointment.notes && (
                        <p className="text-sm opacity-80 truncate">
                          {appointment.notes}
                        </p>
                      )}
                    </button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/appointments/${appointment.id}`)}
                      className="shrink-0 h-8 w-8"
                    >
                      <Edit2 className="h-4 w-4" />
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

export default TodayView;
