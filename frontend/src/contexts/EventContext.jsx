import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/events');
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = (filters) => {
    let filtered = [...events];

    if (filters.venue) {
      filtered = filtered.filter(event => 
        event.venue.toLowerCase().includes(filters.venue.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(event => event.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(event => event.price <= filters.maxPrice);
    }

    if (filters.date) {
      filtered = filtered.filter(event => event.date === filters.date);
    }

    setFilteredEvents(filtered);
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      filteredEvents, 
      loading, 
      error, 
      fetchEvents, 
      filterEvents 
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}