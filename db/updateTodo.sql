update  todos
set checked=$1,
where id=$2;

select * from todos where user_id=$3 and todo_date=$4;