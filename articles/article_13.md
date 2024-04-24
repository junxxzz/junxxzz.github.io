SELECT table_name FROM information_schema.tables;

SELECT * FROM information_schema.tables where table_schema='tss';

use tss;
create table tbl_log_02 as select * from tbl_log;

create or replace view vw_log as
	select * from tbl_log_01
    union all
    select * from tbl_log_02;

select * from vw_log;

set @temp = "create or replace view vw_temp as";
set @temp = concat(@temp, " select * from tbl_log_01");
set @temp = concat(@temp, " union all select * from tbl_log_02");
set @temp = concat(@temp, " union all select * from tbl_log_02");
set @temp = concat(@temp, ";");
select @temp;
