import { useState } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  spots: number;
}

export function Volunteer() {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Food Bank Distribution',
      date: '2024-03-20',
      time: '09:00 AM - 12:00 PM',
      location: 'Main Street Food Bank',
      spots: 5,
    },
    {
      id: '2',
      title: 'Community Garden Maintenance',
      date: '2024-03-22',
      time: '02:00 PM - 05:00 PM',
      location: 'Green Valley Garden',
      spots: 3,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Volunteer Opportunities
          </h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {events.map((event) => (
          <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {event.spots} spots left
                </span>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {event.spots} volunteers needed
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-green-800">Want to organize an event?</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>
              If you'd like to organize a volunteer event, please contact our volunteer coordinator.
              We're always looking for new opportunities to help our community!
            </p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Contact Coordinator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}