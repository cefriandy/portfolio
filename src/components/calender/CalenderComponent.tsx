import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTodos } from '../../contexts/TodoContext';

interface Event {
    id: string;
    title: string;
    start: string;
    description: string;
    completed: boolean;
}

const EventListModal = ({ events, onClose, onSelectEvent }: { events: Event[]; onClose: () => void; onSelectEvent: (event: Event) => void }) => {
    if (!events.length) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Select an Event</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            {events.map(event => (
                                <li key={event.id} className="list-group-item" onClick={() => onSelectEvent(event)}>
                                    {event.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventDetailModal = ({ event, onClose }: { event: Event | null; onClose: () => void }) => {
    if (!event) return null;

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{event.title}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CalendarComponent = () => {
    const { events } = useTodos();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [eventsForDate, setEventsForDate] = useState<Event[]>([]);

    const handleDateClick = (info: { dateStr: string }) => {
        const eventsOnDate = events.filter(e => e.start.split('T')[0] === info.dateStr);
        console.log('Events on date:', eventsOnDate); // Log the found events
        if (eventsOnDate.length > 0) {
            setEventsForDate(eventsOnDate);
        }
    };

    const closeEventListModal = () => {
        setEventsForDate([]);
    };

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
        setEventsForDate([]); // Clear the list after selecting an event
    };

    const closeDetailModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="container p-3 shadow border mt-10" style={{ maxWidth: '900px' }}>
            <h4 className="mb-3">Calendar View</h4>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
            />

            <EventListModal events={eventsForDate} onClose={closeEventListModal} onSelectEvent={handleSelectEvent} />
            <EventDetailModal event={selectedEvent} onClose={closeDetailModal} />
        </div>
    );
};

export default CalendarComponent;