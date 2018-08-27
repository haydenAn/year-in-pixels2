select c.colorvalue,c.opacity,c.color_data,c.positive,to_char(p.pixel_date,'MM-DD-YYYY') as pixel_date,p.id from pixels p
inner join colors c on c.pixel_id = p.id
where owner_id=$1;