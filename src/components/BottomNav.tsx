import { NavLink } from 'react-router-dom';
import { Calendar, CalendarDays, Home, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const BottomNav = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const navItems = [
    { to: '/today', icon: Home, label: 'Today' },
    { to: '/clients', icon: User, label: 'Clients' },
    { to: '#', icon: Plus, label: 'Add', isSpecial: true },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
  ];

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAddMenu(true);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              if (item.isSpecial) {
                return (
                  <button
                    key={item.label}
                    onClick={handleAddClick}
                    className="flex flex-col items-center justify-center gap-1 text-primary transition-colors"
                  >
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <Dialog open={showAddMenu} onOpenChange={setShowAddMenu}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>What would you like to add?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Button
              onClick={() => {
                setShowAddMenu(false);
                window.location.href = '/appointments/new';
              }}
              className="w-full justify-start h-auto py-4"
              variant="outline"
            >
              <Calendar className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Add Appointment</div>
                <div className="text-sm text-muted-foreground">
                  Schedule a new appointment
                </div>
              </div>
            </Button>
            <Button
              onClick={() => {
                setShowAddMenu(false);
                window.location.href = '/clients/new';
              }}
              className="w-full justify-start h-auto py-4"
              variant="outline"
            >
              <User className="mr-3 h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">Add Client</div>
                <div className="text-sm text-muted-foreground">
                  Add a new client to your list
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNav;
