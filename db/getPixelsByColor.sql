select c.colorvalue,c.opacity,to_char(p.pixel_date,'MM-DD-YYYY') as pixel_date,p.id,pc.img_url,pc.text from pixels p
inner join colors c on c.pixel_id = p.id
inner join pixel_content pc on pc.pixel_id =c.pixel_id
where owner_id=$1 and c.colorvalue=$2; 