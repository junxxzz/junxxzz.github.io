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



delimiter $$
use tss$$
drop procedure pro1$$
create procedure pro1()
begin
	declare table_exists varchar(64);
	select table_name into table_exists from information_schema.tables where table_name='test1';
    if table_exists!='' then
		-- select concat(table_exists,' is exists');
        select * from test1;
        drop table test1;
	else
		CREATE TABLE `test1` (
		  `1` int NOT NULL DEFAULT '0',
		  `2` int NOT NULL DEFAULT '0',
		  `3` int NOT NULL DEFAULT '0',
		  `4` int NOT NULL DEFAULT '0',
		  `5` int NOT NULL DEFAULT '0',
		  `6` int NOT NULL DEFAULT '0',
		  `7` int NOT NULL DEFAULT '0',
		  `8` int NOT NULL DEFAULT '0',
		  `9` int NOT NULL DEFAULT '0',
		  `10` int NOT NULL DEFAULT '0'
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        insert into test1 values(1,2,3,4,5,6,7,8,9,10);
    end if;
end$$

delimiter ;




call pro1();