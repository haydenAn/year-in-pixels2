select * from events
where user_id=$1 and Extract(month from event_date)=$2; 