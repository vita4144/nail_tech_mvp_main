import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import lotusLogo from '@/assets/lotus-logo.png';
import { useApp, AppointmentStatus } from '@/contexts/AppContext';

// Convert 12-hour time (9:00 AM) to 24-hour format (09:00)
const convertTo24Hour = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = modifier === 'AM' ? '00' : '12';
  } else if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours.padStart(2, '0')}:${minutes}`;
};

// Convert 24-hour time (09:00) to 12-hour format (9:00 AM)
const convertTo12Hour = (time24h: string): string => {
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours, 10);
  
  const modifier = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  
  return `${hour12}:${minutes} ${modifier}`;
};
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import BottomNav from '@/components/BottomNav';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { clients, appointments, addAppointment, updateAppointment, getClientById } = useApp();
  const { toast } = useToast();

  const isEditMode = !!id;
  const existingAppointment = isEditMode
    ? appointments.find((a) => a.id === id)
    : null;
  const preselectedClientId = location.state?.clientId;

  const [formData, setFormData] = useState({
    clientId: preselectedClientId || '',
    date: '',
    time: '',
    status: 'booked' as AppointmentStatus,
    notes: '',
  });

  useEffect(() => {
    if (existingAppointment) {
      setFormData({
        clientId: existingAppointment.clientId,
        date: existingAppointment.date,
        time: convertTo24Hour(existingAppointment.time),
        status: existingAppointment.status,
        notes: existingAppointment.notes || '',
      });
    }
  }, [existingAppointment]);

  const selectedClient = formData.clientId ? getClientById(formData.clientId) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientId || !formData.date || !formData.time) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const appointmentData = {
      ...formData,
      time: convertTo12Hour(formData.time),
    };

    if (isEditMode && id) {
      updateAppointment(id, appointmentData);
      toast({
        title: 'Appointment updated',
        description: 'The appointment has been updated successfully',
      });
    } else {
      addAppointment(appointmentData);
      toast({
        title: 'Appointment added',
        description: 'New appointment has been scheduled',
      });
    }

    navigate('/today', { state: { date: formData.date } });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src={lotusLogo} alt="Nail Tech App Logo" className="h-8 w-8" />
              <span className="font-ptsans font-bold text-xl">Nail Tech App</span>
            </div>
          </div>

          <h1 className="text-xl font-bold">
            {isEditMode ? 'Edit Appointment' : 'Add Appointment'}
          </h1>
          <p className="text-sm text-primary-foreground/80 mt-1">
            {isEditMode
              ? 'Update appointment details'
              : 'Fill in the details to add a new client to your list'}
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientId">Client Name</Label>
              <Select
                value={formData.clientId}
                onValueChange={(value) =>
                  setFormData({ ...formData, clientId: value })
                }
              >
                <SelectTrigger id="clientId">
                  <SelectValue placeholder="Select client..." />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedClient && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={selectedClient.phone}
                    readOnly
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={selectedClient.email}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="date">Appointment Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Appointment Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>

            {isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: AppointmentStatus) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                placeholder="Service details..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold">
            {isEditMode ? 'Update Appointment' : 'Save Appointment'}
          </Button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default AppointmentForm;
