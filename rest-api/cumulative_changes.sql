drop table if exists temp1; 

create temp table if not exists temp1(application_id uuid,
					   vehicle_id uuid,
					   event_name varchar(45),
					   timestamp timestamp,
					   lead_timestamp timestamp,
					   lead_event varchar(45),
					   duration interval,
					   duration_seconds int);
					   
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
			and date_trunc('day', timestamp) >= date_trunc('day', coalesce((select max(timestamp) from temp1), '1900-01-01'))
		order by application_id, timestamp desc;
		
drop table if exists usage_over_time;
								
create temp table if not exists usage_over_time( vehicle_id uuid,
					   application_id uuid,
					   total_time interval,
					   uses bigint,
					   max_time interval,
					   min_time interval, 
					   std_dev interval, 
					   variance bigint,
  					   day timestamp,
						week timestamp,
						month timestamp,
						year timestamp,
						CONSTRAINT basic UNIQUE (vehicle_id, 
												 	application_id,
													day,
													week,
													month,
													year)
					);			   

insert into usage_over_time
select vehicle_id, 
		application_id, 
		sum(duration) as tot_time,  
		count(*) as uses,
		max(duration) as max_time,
		min(duration) as min_time,
		stddev_samp(duration_seconds)* interval '1 sec' as std_dev,
        variance(duration_seconds) as variance,
		date_trunc('day', timestamp ) as day,
		date_trunc('week', timestamp ) as week,
		date_trunc('month', timestamp ) as month,
		date_trunc('year', timestamp ) as year
								
								
	from temp1
	where event_name = 'RESUMED'
		and lead_event = 'STOPPED'
	group by  
				rollup(vehicle_id, application_id, date_trunc('year', timestamp ), date_trunc('month', timestamp ), date_trunc('week', timestamp ), date_trunc('day', timestamp ))
	order by year, month, week, day, vehicle_id, application_id;
-- 	where date_trunc('day', timestamp) >= date_trunc(coalesce((select max(day) from usage_over_time), '1900-01-01'))
	
select v.name as vehicle_name, a.name as application_name, total_time, uses, max_time, min_time, std_dev, variance, day, week, month, year from usage_over_time
	join applications a on a.id = application_id
	join vehicles v on v.id = vehicle_id;
	
	
	
		
