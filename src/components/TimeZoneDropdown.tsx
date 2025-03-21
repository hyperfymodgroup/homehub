
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface TimeZone {
  name: string;
  label: string;
  offset: number;
}

const TIMEZONES: TimeZone[] = [
  { name: 'UTC', label: 'UTC', offset: 0 },
  { name: 'EDT', label: 'New York', offset: -4 },
  { name: 'PDT', label: 'Los Angeles', offset: -8 },
  { name: 'GMT', label: 'London', offset: 1 },
  { name: 'AEDT', label: 'Sydney', offset: 11 },
];

const TimeZoneDropdown = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(TIMEZONES[0]);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeForZone = (timeZone: TimeZone) => {
    // Create a new date with the timezone offset applied
    const date = new Date(currentTime);

    // Get the UTC time
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

    // Create new date with the timezone offset
    const targetTime = new Date(utcTime + (timeZone.offset * 3600000));

    return format(targetTime, 'HH:mm');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cyber-button-sm flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-mono text-sm">{selectedTimeZone.name} {formatTimeForZone(selectedTimeZone)}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-cyber-black border border-cyber-turquoise/30 w-56">
        <DropdownMenuLabel className="text-cyber-turquoise">Time Zones</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-turquoise/20" />

        {TIMEZONES.map((timezone) => (
          <DropdownMenuItem
            key={timezone.name}
            className="flex justify-between text-gray-300 hover:text-white hover:bg-cyber-gray/50 cursor-default"
            onClick={() => setSelectedTimeZone(timezone)}
          >
            <span className={selectedTimeZone.name === timezone.name ? "text-cyber-pink" : ""}>{timezone.name} ({timezone.label})</span>
            <span className="font-mono text-cyber-turquoise">{formatTimeForZone(timezone)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeZoneDropdown;
