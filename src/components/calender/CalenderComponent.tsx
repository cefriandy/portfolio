import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useTodos } from '../../contexts/TodoContext';

interface Event {
    id: string;
    title: string;
    start: string;
    description: string;
    completed: boolean;
}

const CalendarComponent = () => {
    const { events } = useTodos();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleDateClick = (info: { dateStr: string }) => {
        const event = events.find(e => e.start === info.dateStr);
        if (event) {
            setSelectedEvent(event);
            const modalElement = document.getElementById('eventModal');
            if (modalElement) {
                const modal = new window.bootstrap.Modal(modalElement);
                modal.show();
            } else {
                console.error('Modal element not found');
            }
        }
    };

    return (
        <div className="container p-3 shadow border mt-10" style={{ maxWidth: '900px' }}>
            <h4 className="mb-3">Calendar View</h4>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]} // Include interaction plugin
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
            />

            {selectedEvent && (
                <div className="modal fade" id="eventModal" tabIndex={-1} aria-labelledby="eventModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="eventModalLabel">{selectedEvent.title}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedEvent.start}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarComponent;