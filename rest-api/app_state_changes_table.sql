drop table if exists temp1;

create temp table temp1(application_id uuid,
					   vehicle_id uuid,
					   event_name varchar(45),
					   timstamp timestamp,
					   lead_timestamp timestamp,
					   lead_event varchar(45),
					   duration interval,
					   curation_seconds int);
					   
insert into temp1 		
select application_id,
		vehicle_id,
		event_name,
		timestamp, 
		lead(timestamp) over (partition by application_id, vehicle_id order by timestamp),
		lead(event_name) over (partition by application_id, vehicle_id order by timestamp) as lead_event,
		age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp),
		EXTRACT(SECOND FROM age(lead(timestamp) over (partition by application_id, vehicle_id order by timestamp), timestamp))
	from app_state_changes
		where event_name in ('RESUMED','STOPPED')
		order by application_id, timestamp desc;
		
		
drop table if exists temp2;

create temp table temp2(application_id uuid,
					   vehicle_id uuid,
					   event_name varchar(45),
					   timstamp timestamp,
					   lead_timestamp timestamp,
					   lead_event varchar(45),
					   duration interval,
					   duration_second int);
					   
insert into temp2
select * from temp1	
	where event_name = 'RESUMED'
		and lead_event = 'STOPPED';
		
		
select vehicle_id, 
		application_id, 
		sum(duration) as tot_time,  
		count(*) as uses,
		max(duration) as max_time,
		min(duration) as min_time,
		stddev_samp(duration_second)
	from temp2
		group by vehicle_id, application_id;

		
