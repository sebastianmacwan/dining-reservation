import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  image: string;
  address: string;
  description: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
}

interface BookingState {
  selectedRestaurant: Restaurant | null;
  selectedDate: string;
  selectedTime: string;
  guests: number;
  timeSlots: TimeSlot[];
  currentBooking: Booking | null;
  userBookings: Booking[];
}

interface BookingContextType extends BookingState {
  setSelectedRestaurant: (restaurant: Restaurant) => void;
  setBookingDetails: (date: string, time: string, guests: number) => void;
  fetchTimeSlots: (restaurantId: string, date: string) => Promise<void>;
  createBooking: (bookingData: any) => Promise<boolean>;
  fetchUserBookings: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const bookingReducer = (state: BookingState, action: any): BookingState => {
  switch (action.type) {
    case 'SET_RESTAURANT':
      return { ...state, selectedRestaurant: action.payload };
    case 'SET_BOOKING_DETAILS':
      return {
        ...state,
        selectedDate: action.payload.date,
        selectedTime: action.payload.time,
        guests: action.payload.guests,
      };
    case 'SET_TIME_SLOTS':
      return { ...state, timeSlots: action.payload };
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'SET_USER_BOOKINGS':
      return { ...state, userBookings: action.payload };
    default:
      return state;
  }
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, {
    selectedRestaurant: null,
    selectedDate: '',
    selectedTime: '',
    guests: 2,
    timeSlots: [],
    currentBooking: null,
    userBookings: [],
  });

  const setSelectedRestaurant = (restaurant: Restaurant) => {
    dispatch({ type: 'SET_RESTAURANT', payload: restaurant });
  };

  const setBookingDetails = (date: string, time: string, guests: number) => {
    dispatch({ type: 'SET_BOOKING_DETAILS', payload: { date, time, guests } });
  };

  const fetchTimeSlots = async (restaurantId: string, date: string) => {
    try {
      const response = await fetch(`/api/restaurants/${restaurantId}/timeslots?date=${date}`);
      if (response.ok) {
        const timeSlots = await response.json();
        dispatch({ type: 'SET_TIME_SLOTS', payload: timeSlots });
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
    }
  };

  const createBooking = async (bookingData: any): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        dispatch({ type: 'SET_CURRENT_BOOKING', payload: booking });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to create booking:', error);
      return false;
    }
  };

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/bookings/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const bookings = await response.json();
        dispatch({ type: 'SET_USER_BOOKINGS', payload: bookings });
      }
    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchUserBookings();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      return false;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        setSelectedRestaurant,
        setBookingDetails,
        fetchTimeSlots,
        createBooking,
        fetchUserBookings,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (undefined === context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};