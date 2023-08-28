select tbven.idven
from tbven join tbvc ON tbven.idven = tbvc.idven
JOIN tbcob ON tbvc.idcob = tbcob.idcob
where tbven.idemp = 28



select tbven.idven
from tbven 
where tbven.idemp = 28
and tbven.vtipo IN ('VD', 'VF')



select a.* FROM (
select tbven.*
from tbven 
where tbven.idemp = 52
and tbven.vtipo IN ('VD', 'VF')
and tbven.vefa NOT IN ( 'A')
) a LEFT JOIN (

select tbven.idven
from tbven join tbvc ON tbven.idven = tbvc.idven
JOIN tbcob ON tbvc.idcob = tbcob.idcob
where tbven.idemp = 52
) b ON a.idven = b.idven
WHERE b.idven IS  NULL



select a.* FROM (
select tbven.*
from tbven 
where tbven.vtipo IN ('VD', 'VF')
and tbven.vefa NOT IN ( 'A')
) a LEFT JOIN (

select tbven.idven
from tbven join tbvc ON tbven.idven = tbvc.idven
JOIN tbcob ON tbvc.idcob = tbcob.idcob

) b ON a.idven = b.idven
WHERE b.idven IS  NULL



select top 1000 tbtgac.*
FROM tbtgac JOIN tbCortes on tbtgac.idcor = tbCortes.idcor
