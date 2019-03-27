drop table if exists summary_timeline;

create temp table summary_timeline(event_name varchar(45),
					  event varchar(45),
					  timestamp timestamp,
					  vehicle_id uuid,
					  application_id uuid);

 
insert into summary_timeline(event_name, event, timestamp, vehicle_id, application_id) 
      select button_name, 'button_press', timestamp, vehicle_id, null from button_presses
        where timestamp > (select coalesce(max(timestamp),'1900-01-01') from summary_timeline)
      union
      select screen_name, 'active_screen', timestamp, vehicle_id, application_id from active_screens
        where timestamp > (select coalesce(max(timestamp),'1900-01-01') from summary_timeline)
      union
      select event_name, 'app_state_change', timestamp, vehicle_id, application_id from app_state_changes
        where timestamp > (select coalesce(max(timestamp),'1900-01-01') from summary_timeline)
	  union
      select 'ignition_start', 'ignition', start_timestamp, vehicle_id, null from ignitions
        where start_timestamp > (select coalesce(max(timestamp),'1900-01-01') from summary_timeline)
	  union
      select 'ignition_end', 'ignition', stop_timestamp, vehicle_id, null from ignitions
        where stop_timestamp > (select coalesce(max(timestamp),'1900-01-01') from summary_timeline)
      order by timestamp;
	  
	  
	  
	  
select * from summary_timeline;

