select Round(AVG(c.color_data),0) AS color_avg,Extract(month from p.pixel_date) as month from pixels p
inner join colors c on c.pixel_id = p.id
where owner_id=$1
group by month;