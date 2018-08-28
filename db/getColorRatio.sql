select count(c.id),c.colorvalue from colors c
join pixels p on c.pixel_id =p.id 
where p.owner_id=$1
group by c.colorvalue;