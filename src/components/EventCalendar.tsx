
import React from 'react';
import { Event } from './EventsSection';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = firstDay.getDay();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Group events by date
  const eventsByDate: { [key: string]: Event[] } = {};
  events.forEach(event => {
    if (event.date.startsWith(`${year}-${(month + 1).toString().padStart(2, '0')}`)) {
      if (!eventsByDate[event.date]) {
        eventsByDate[event.date] = [];
      }
      eventsByDate[event.date].push(event);
    }
  });

  // Generate calendar days
  const calendarDays = [];
  let currentDay = 1;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startWeekDay; i++) {
    calendarDays.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Split into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>
          Calendario de Eventos - {monthNames[month]} {year}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {dayNames.map(day => (
                  <th key={day} className="border border-border p-2 bg-muted font-semibold text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const dateStr = day 
                      ? `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                      : '';
                    const dayEvents = day ? eventsByDate[dateStr] || [] : [];

                    return (
                      <td key={dayIndex} className="border border-border p-2 h-24 w-1/7 align-top relative">
                        {day && (
                          <>
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event, eventIndex) => (
                                <Badge 
                                  key={event.id} 
                                  variant="secondary" 
                                  className="text-xs truncate block w-full"
                                  title={`${event.title} - ${event.time}`}
                                >
                                  {event.title}
                                </Badge>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayEvents.length - 2} más
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCalendar;
