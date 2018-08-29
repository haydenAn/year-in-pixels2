select c.colorvalue,c.opacity,pc.text,pc.img_url,pc.pixel_id from pixel_content pc
full join colors c on c.pixel_id = pc.pixel_id
where pc.pixel_id=$1;