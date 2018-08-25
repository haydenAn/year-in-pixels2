update  quotes
set text=$1,author=$2
where id=$3 RETURNING *;