update colors
set colorvalue =$6,
opacity =$5,
positive =$4,
color_data=$7
where pixel_id=$1;
update pixel_content
set text=$2,
img_url=$3 
where pixel_id = $1;