select c.colorvalue,c.opacity,to_char(p.pixel_date,'MM-DD-YYYY') as pixel_date from pixels p
full join colors c on c.pixel_id = p.id
where owner_id=$1;