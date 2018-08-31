update events
set title =$1,
text =$2,
location =$3,
important=$4 
where id = $5
RETURNING *;
