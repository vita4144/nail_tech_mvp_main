import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppointmentStatus = 'booked' | 'completed' | 'canceled' | 'banned';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferences: string;
  isBanned: boolean;
}

export interface Appointment {
  id: string;
  clientId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

interface AppContextType {
  clients: Client[];
  appointments: Appointment[];
  addClient: (client: Omit<Client, 'id' | 'isBanned'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  banClient: (id: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getClientById: (id: string) => Client | undefined;
  getAppointmentsByClientId: (clientId: string) => Appointment[];
  getAppointmentsByDate: (date: string) => Appointment[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Emily',
    lastName: 'Johnson',
    phone: '(555) 123-4567',
    email: 'emily.j@example.com',
    preferences: 'Prefers gel polish, loves pink shades',
    isBanned: false,
  },
  {
    id: '2',
    firstName: 'Sophia',
    lastName: 'Martinez',
    phone: '(555) 234-5678',
    email: 'sophia.m@example.com',
    preferences: 'Sensitive cuticles, prefers natural look',
    isBanned: false,
  },
  {
    id: '3',
    firstName: 'Olivia',
    lastName: 'Wilson',
    phone: '(555) 345-6789',
    email: 'olivia.w@example.com',
    preferences: 'Loves designs and nail art',
    isBanned: false,
  },
  {
    id: '4',
    firstName: 'Ava',
    lastName: 'Thompson',
    phone: '(555) 456-7890',
    email: 'ava.t@example.com',
    preferences: 'Quick service preferred, always on time',
    isBanned: false,
  },
  {
    id: '5',
    firstName: 'Isabella',
    lastName: 'Garcia',
    phone: '(555) 567-8901',
    email: 'isabella.g@example.com',
    preferences: 'Allergic to acetone, use alternative removers',
    isBanned: false,
  },
  {
    id: '6',
    firstName: 'Megan',
    lastName: 'Taylor',
    phone: '(555) 678-9012',
    email: 'megan.t@example.com',
    preferences: 'Enjoys manicure and pedicure combo',
    isBanned: false,
  },
  {
    id: '7',
    firstName: 'Amanda',
    lastName: 'Chen',
    phone: '(555) 789-0123',
    email: 'amanda.c@example.com',
    preferences: 'Short nails, no extensions',
    isBanned: false,
  },
  {
    id: '8',
    firstName: 'Rachel',
    lastName: 'Kim',
    phone: '(555) 890-1234',
    email: 'rachel.k@example.com',
    preferences: 'Prefers late afternoon appointments',
    isBanned: false,
  },
  {
    id: '9',
    firstName: 'Rachel',
    lastName: 'Adams',
    phone: '(555) 901-2345',
    email: 'rachel.a@example.com',
    preferences: 'Enjoys french manicure style',
    isBanned: false,
  },
  {
    id: '10',
    firstName: 'Jessica',
    lastName: 'Wang',
    phone: '(555) 012-3456',
    email: 'jessica.w@example.com',
    preferences: 'Prefers deep cleaning and massage',
    isBanned: false,
  },
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    date: '2025-11-03',
    time: '9:00 AM',
    status: 'booked',
    notes: 'Full set gel nails',
  },
  {
    id: '2',
    clientId: '2',
    date: '2025-11-03',
    time: '11:30 AM',
    status: 'booked',
    notes: 'Gel polish removal and manicure',
  },
  {
    id: '3',
    clientId: '3',
    date: '2025-11-03',
    time: '1:00 PM',
    status: 'booked',
    notes: 'Nail art special',
  },
  {
    id: '4',
    clientId: '4',
    date: '2025-11-03',
    time: '3:10 PM',
    status: 'booked',
    notes: 'Manicure and special',
  },
  {
    id: '5',
    clientId: '5',
    date: '2025-11-03',
    time: '5:15 PM',
    status: 'booked',
    notes: 'Pedicure with French tips',
  },
  {
    id: '6',
    clientId: '6',
    date: '2025-11-04',
    time: '10:00 AM',
    status: 'booked',
    notes: 'Spa pedicure',
  },
  {
    id: '7',
    clientId: '7',
    date: '2025-11-05',
    time: '2:00 PM',
    status: 'booked',
    notes: 'Gel manicure',
  },
  {
    id: '8',
    clientId: '1',
    date: '2025-10-15',
    time: '2:00 PM',
    status: 'completed',
    notes: 'Full Set Gel Nails - French manicure accent',
  },
  {
    id: '9',
    clientId: '1',
    date: '2025-09-20',
    time: '3:00 PM',
    status: 'completed',
    notes: 'Gel Polish Manicure - Polish with nude topcoat',
  },
  {
    id: '10',
    clientId: '1',
    date: '2025-08-12',
    time: '11:00 AM',
    status: 'completed',
    notes: 'Nail Repair - Broke finger repair and polish touch-up',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const addClient = (client: Omit<Client, 'id' | 'isBanned'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      isBanned: false,
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (id: string, clientUpdate: Partial<Client>) => {
    setClients(clients.map((c) => (c.id === id ? { ...c, ...clientUpdate } : c)));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
    setAppointments(appointments.filter((a) => a.clientId !== id));
  };

  const banClient = (id: string) => {
    updateClient(id, { isBanned: true });
    // Update all future appointments to banned status
    setAppointments(
      appointments.map((a) =>
        a.clientId === id && new Date(a.date) >= new Date()
          ? { ...a, status: 'banned' }
          : a
      )
    );
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id: string, appointmentUpdate: Partial<Appointment>) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, ...appointmentUpdate } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  const getClientById = (id: string) => {
    return clients.find((c) => c.id === id);
  };

  const getAppointmentsByClientId = (clientId: string) => {
    return appointments
      .filter((a) => a.clientId === clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getAppointmentsByDate = (date: string) => {
    return appointments
      .filter((a) => a.date === date)
      .sort((a, b) => {
        const timeA = new Date(`2000-01-01 ${a.time}`).getTime();
        const timeB = new Date(`2000-01-01 ${b.time}`).getTime();
        return timeA - timeB;
      });
  };

  return (
    <AppContext.Provider
      value={{
        clients,
        appointments,
        addClient,
        updateClient,
        deleteClient,
        banClient,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        getClientById,
        getAppointmentsByClientId,
        getAppointmentsByDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
