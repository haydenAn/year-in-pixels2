select colorvalue,opacity,positive,color_data,text,img_url from pixel_content pc
full join colors c on c.pixel_id = pc.pixel_id
where pc.pixel_id=$1;