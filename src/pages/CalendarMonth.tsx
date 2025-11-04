import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

const CalendarMonth = () => {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const daysInView = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const hasAppointments = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return appointments.some((apt) => apt.date === dateString);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (date: Date) => {
    navigate('/today', { state: { date: format(date, 'yyyy-MM-dd') } });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-4">
            <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
            <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h1 className="text-lg font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h1>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-card rounded-xl border border-border p-4">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {daysInView.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isTodayDate = isToday(day);
              const hasApts = hasAppointments(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  className={`
                    relative aspect-square rounded-lg flex items-center justify-center text-sm
                    transition-all
                    ${
                      !isCurrentMonth
                        ? 'text-muted-foreground/40'
                        : 'text-foreground hover:bg-accent'
                    }
                    ${isTodayDate ? 'bg-primary text-primary-foreground font-bold' : ''}
                  `}
                >
                  <span>{format(day, 'd')}</span>
                  {hasApts && isCurrentMonth && (
                    <span
                      className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        isTodayDate ? 'bg-primary-foreground' : 'bg-primary'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 bg-accent/50 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Tap any day to view appointments
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CalendarMonth;
