delete from pixel_content where pixel_id=$1;
delete from colors where pixel_id=$1;
delete from pixels where id=$1;