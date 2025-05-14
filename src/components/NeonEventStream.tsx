import React, { useEffect, useState } from 'react';
// Use the correct import for EventSource
import * as EventSourceModule from 'eventsource';
// @ts-ignore - Handle the module import differences
const EventSource = EventSourceModule.default || EventSourceModule.EventSource || EventSourceModule;
import './NeonEventStream.css';

interface NeonEvent {
  id: string;
  event: string;
  data: any;
  timestamp: string;
}

interface NeonEventStreamProps {
  endpoint?: string;
  onEvent?: (event: NeonEvent) => void;
}

const NeonEventStream: React.FC<NeonEventStreamProps> = ({
  endpoint = 'https://mcp.neon.tech/sse',
  onEvent
}) => {
  const [events, setEvents] = useState<NeonEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a new EventSource connection to the Neon MCP SSE endpoint
    const eventSource = new EventSource(endpoint);
    
    // Handle connection open
    eventSource.onopen = () => {
      console.log('Connected to Neon MCP SSE endpoint');
      setConnected(true);
      setError(null);
    };

    // Handle connection error
    eventSource.onerror = (err: Event) => {
      console.error('Error connecting to Neon MCP SSE endpoint:', err);
      setConnected(false);
      setError('Failed to connect to Neon MCP SSE endpoint. Make sure you have proper authentication.');
      eventSource.close();
    };

    // Handle incoming messages
    eventSource.onmessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        const newEvent: NeonEvent = {
          id: data.id || `event-${Date.now()}`,
          event: e.type,
          data: data,
          timestamp: new Date().toISOString()
        };

        setEvents((prevEvents) => [newEvent, ...prevEvents].slice(0, 100)); // Keep last 100 events
        
        // Call the onEvent callback if provided
        if (onEvent) {
          onEvent(newEvent);
        }
      } catch (err) {
        console.error('Error parsing SSE event:', err);
      }
    };

    // You can also listen for specific event types
    eventSource.addEventListener('database-update', (e: MessageEvent) => {
      console.log('Database update event received:', e.data);
      // Handle specific event type
    });

    // Clean up the connection when component unmounts
    return () => {
      console.log('Closing Neon MCP SSE connection');
      eventSource.close();
    };
  }, [endpoint, onEvent]);

  return (
    <div className="neon-event-stream" role="region" aria-label="Neon Event Stream">
      <h2 id="neon-stream-title">Neon MCP Event Stream</h2>
      <div className="connection-status" aria-live="polite">
        <span id="connection-status-label">Status: </span>
        {connected ? (
          <span className="connected" aria-label="Connected">Connected</span>
        ) : (
          <span className="disconnected" aria-label="Disconnected">Disconnected</span>
        )}
      </div>
      
      {error && (
        <div className="error-message" role="alert">
          Error: {error}
        </div>
      )}

      <div className="events-container">
        <h3 id="recent-events-title">Recent Events</h3>
        {events.length === 0 ? (
          <p aria-labelledby="recent-events-title">No events received yet...</p>
        ) : (
          <ul className="events-list" aria-labelledby="recent-events-title">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-header">
                  <span className="event-type">{event.event}</span>
                  <span className="event-time">{new Date(event.timestamp).toLocaleTimeString()}</span>
                </div>
                <pre className="event-data" tabIndex={0}>{JSON.stringify(event.data, null, 2)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NeonEventStream;
