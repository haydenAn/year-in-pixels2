select Round(AVG(c.color_data),0) AS color_avg,Extract(day from p.pixel_date) as pixel_day from pixels p
full join colors c on c.pixel_id = p.id
where owner_id=$1 and Extract(month from p.pixel_date)=$2
group by p.pixel_date;
