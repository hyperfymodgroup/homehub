
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
  { name: 'EST', label: 'New York', offset: -4 },
  { name: 'PST', label: 'Los Angeles', offset: -7 },
  { name: 'GMT', label: 'London', offset: 1 },
  { name: 'AEST', label: 'Sydney', offset: 10 },
];

const TimeZoneDropdown = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
        <span className="font-mono text-sm">{formatTimeForZone(TIMEZONES[0])}</span>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="bg-cyber-black border border-cyber-turquoise/30 w-56">
        <DropdownMenuLabel className="text-cyber-turquoise">Time Zones</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-cyber-turquoise/20" />
        
        {TIMEZONES.map((timezone) => (
          <DropdownMenuItem key={timezone.name} className="flex justify-between text-gray-300 hover:text-cyber-turquoise hover:bg-cyber-gray/30 cursor-default">
            <span>{timezone.name} ({timezone.label})</span>
            <span className="font-mono text-cyber-turquoise">{formatTimeForZone(timezone)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TimeZoneDropdown;
