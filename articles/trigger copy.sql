create table temp1 (
    idx varchar2(100) not null,
    name varchar2(200) not null,
    addr varchar2(500) null
)
/
create table temp1log (
    deldate date not null,
    idx varchar2(100) not null,
    name varchar2(200) not null,
    addr varchar2(500) null
)
/

CREATE OR REPLACE TRIGGER temp1_delete
  FOR DELETE ON temp1
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 7;

  TYPE log_t IS TABLE OF temp1log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp1log VALUES log1(j);
    log1.delete();
    idx := 0;
    DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).name := :OLD.name;
    log1(idx).addr := :OLD.addr;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp1_delete;
/

insert into temp1 values (DBMS_RANDOM.NORMAL(), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10));



begin
for i in 1..100000 loop
insert into temp1 values (DBMS_RANDOM.NORMAL(), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10));
end loop;
end;




CREATE OR REPLACE TRIGGER temp1_delete1
after DELETE ON temp1
for EACH ROW
BEGIN
    insert into temp1log values(sysdate, :old.idx, :old.name, :old.addr);
END;



select count(*) from temp1;
select count(*) from temp1log;
select count(*) from temp1 where name like '%E%';
delete from temp1 where name like '%E%';




create table temp11 (
    idx varchar2(100) not null,
    temp1 varchar2(200) not null,
    temp2 varchar2(200) not null,
    temp3 varchar2(200) not null,
    temp4 varchar2(200) not null,
    temp5 varchar2(200) not null,
    temp6 varchar2(200) not null,
    temp7 varchar2(200) not null,
    temp8 varchar2(200) not null,
    temp9 varchar2(200) not null,
    temp10 varchar2(200) not null,
    temp11 varchar2(200) not null,
    temp12 varchar2(200) not null,
    temp13 varchar2(200) not null,
    temp14 varchar2(200) not null,
    temp15 varchar2(200) not null,
    temp16 varchar2(200) not null,
    temp17 varchar2(200) not null,
    temp18 varchar2(200) not null,
    temp19 varchar2(200) not null,
    temp20 varchar2(200) not null,
    temp21 varchar2(200) not null,
    temp22 varchar2(200) not null,
    temp23 varchar2(200) not null,
    temp24 varchar2(200) not null,
    temp25 varchar2(200) not null,
    temp26 varchar2(200) not null,
    temp27 varchar2(200) not null,
    temp28 varchar2(200) not null,
    temp29 varchar2(200) not null,
    temp30 varchar2(200) not null,
    temp31 varchar2(200) not null,
    temp32 varchar2(200) not null,
    temp33 varchar2(200) not null,
    temp34 varchar2(200) not null,
    temp35 varchar2(200) not null,
    temp36 varchar2(200) not null,
    temp37 varchar2(200) not null,
    temp38 varchar2(200) not null,
    temp39 varchar2(200) not null,
    temp40 varchar2(200) not null,
    temp41 varchar2(200) not null,
    temp42 varchar2(200) not null,
    temp43 varchar2(200) not null,
    temp44 varchar2(200) not null,
    temp45 varchar2(200) not null,
    temp46 varchar2(500) null
)
/
create unique index temp11_pk on temp11 (
  idx, temp1, temp2, temp3, temp4
)
/
create index temp11_temp1 on temp11 (temp1)
/
create index temp11_temp2 on temp11 (temp2)
/
create index temp11_temp3 on temp11 (temp3)
/
create index temp11_temp4 on temp11 (temp4)
/
create index temp11_temp5 on temp11 (temp5)
/
create index temp11_temp6 on temp11 (temp6)
/
create index temp11_temp7 on temp11 (temp7)
/
create index temp11_temp8 on temp11 (temp8)
/
create index temp11_temp9 on temp11 (temp9)
/
create index temp11_temp10 on temp11 (temp10)
/
create index temp11_temp11 on temp11 (temp11)
/

create table temp11log (
    deldate date not null,
    idx varchar2(100) not null,
    temp1 varchar2(200) not null,
    temp2 varchar2(200) not null,
    temp3 varchar2(200) not null,
    temp4 varchar2(200) not null,
    temp5 varchar2(200) not null,
    temp6 varchar2(200) not null,
    temp7 varchar2(200) not null,
    temp8 varchar2(200) not null,
    temp9 varchar2(200) not null,
    temp10 varchar2(200) not null,
    temp11 varchar2(200) not null,
    temp12 varchar2(200) not null,
    temp13 varchar2(200) not null,
    temp14 varchar2(200) not null,
    temp15 varchar2(200) not null,
    temp16 varchar2(200) not null,
    temp17 varchar2(200) not null,
    temp18 varchar2(200) not null,
    temp19 varchar2(200) not null,
    temp20 varchar2(200) not null,
    temp21 varchar2(200) not null,
    temp22 varchar2(200) not null,
    temp23 varchar2(200) not null,
    temp24 varchar2(200) not null,
    temp25 varchar2(200) not null,
    temp26 varchar2(200) not null,
    temp27 varchar2(200) not null,
    temp28 varchar2(200) not null,
    temp29 varchar2(200) not null,
    temp30 varchar2(200) not null,
    temp31 varchar2(200) not null,
    temp32 varchar2(200) not null,
    temp33 varchar2(200) not null,
    temp34 varchar2(200) not null,
    temp35 varchar2(200) not null,
    temp36 varchar2(200) not null,
    temp37 varchar2(200) not null,
    temp38 varchar2(200) not null,
    temp39 varchar2(200) not null,
    temp40 varchar2(200) not null,
    temp41 varchar2(200) not null,
    temp42 varchar2(200) not null,
    temp43 varchar2(200) not null,
    temp44 varchar2(200) not null,
    temp45 varchar2(200) not null,
    temp46 varchar2(500) null
)
/

begin
for i in 1..100000 loop
insert into temp11 values (DBMS_RANDOM.NORMAL()
  , DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10), DBMS_RANDOM.STRING('A', 10)
);
end loop;
end;
/


set SERVEROUTPUT ON

DBMS_OUTPUT.PUT_LINE('I got here:'||:new.col||' is the new value');


CREATE OR REPLACE TRIGGER temp11_delete1
after DELETE ON temp11
for EACH ROW
BEGIN
    insert into temp11log values(sysdate, :old.idx, :old.temp1, :old.temp2, :old.temp3, :old.temp4, :old.temp5, :old.temp6, :old.temp7, :old.temp8, :old.temp9, :old.temp10, :old.temp11, :old.temp12, :old.temp13, :old.temp14, :old.temp15, :old.temp16, :old.temp17, :old.temp18, :old.temp19, :old.temp20, :old.temp21, :old.temp22, :old.temp23, :old.temp24, :old.temp25, :old.temp26, :old.temp27, :old.temp28, :old.temp29, :old.temp30, :old.temp31, :old.temp32, :old.temp33, :old.temp34, :old.temp35, :old.temp36, :old.temp37, :old.temp38, :old.temp39, :old.temp40, :old.temp41, :old.temp42, :old.temp43, :old.temp44, :old.temp45, :old.temp46);
END;
/

select count(*) as cnt from temp11 where temp1 like '%A%';

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%A%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/


       CNT
----------
     17919


23-DEC-24 12.41.03.541763000 PM +00:00
23-DEC-24 12.41.21.015007000 PM +00:00

18 sec

alter TRIGGER temp11_delete1 disable;

CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 100;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11 where temp1 like '%B%';


       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%B%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/

/
23-DEC-24 12.50.54.389626000 PM +00:00
23-DEC-24 12.51.00.369576000 PM +00:00

6 sec



CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 1000;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11 where temp1 like '%B%';


       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%B%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/

23-DEC-24 12.52.47.253125000 PM +00:00
23-DEC-24 12.53.02.811271000 PM +00:00

15 sec




CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 10;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11 where temp1 like '%B%';


       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%B%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/


23-DEC-24 12.54.08.448569000 PM +00:00
23-DEC-24 12.54.22.291730000 PM +00:00

14 sec



CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 200;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11 where temp1 like '%B%';


       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%B%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/


23-DEC-24 12.56.24.541719000 PM +00:00
23-DEC-24 12.56.34.179853000 PM +00:00

10 sec



CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 50;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11 where temp1 like '%B%';


       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%B%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/


23-DEC-24 12.57.33.304303000 PM +00:00
23-DEC-24 12.57.47.976664000 PM +00:00

14 sec




CREATE OR REPLACE TRIGGER temp11_delete2
  FOR DELETE ON temp11
    COMPOUND TRIGGER

  threshhold CONSTANT SIMPLE_INTEGER := 100;

  TYPE log_t IS TABLE OF temp11log%ROWTYPE INDEX BY SIMPLE_INTEGER;
  log1  log_t;
  idx SIMPLE_INTEGER := 0;

  PROCEDURE flush_array IS
    n CONSTANT SIMPLE_INTEGER := log1.count();
  BEGIN
    FORALL j IN 1..n
      INSERT INTO temp11log VALUES log1(j);
    log1.delete();
    idx := 0;
    -- DBMS_OUTPUT.PUT_LINE('Flushed ' || n || ' rows');
  END flush_array;

  BEFORE STATEMENT IS
  BEGIN
    flush_array();
    DBMS_OUTPUT.PUT_LINE('delete start');
  END BEFORE STATEMENT;

  AFTER EACH ROW IS
  BEGIN
    idx := idx + 1;
    log1(idx).deldate := SYSDATE;
    log1(idx).idx := :OLD.idx;
    log1(idx).temp1 := :OLD.temp1;
    log1(idx).temp2 := :OLD.temp2;
    log1(idx).temp3 := :OLD.temp3;
    log1(idx).temp4 := :OLD.temp4;
    log1(idx).temp5 := :OLD.temp5;
    log1(idx).temp6 := :OLD.temp6;
    log1(idx).temp7 := :OLD.temp7;
    log1(idx).temp8 := :OLD.temp8;
    log1(idx).temp9 := :OLD.temp9;
    log1(idx).temp10 := :OLD.temp10;
    log1(idx).temp11 := :OLD.temp11;
    log1(idx).temp12 := :OLD.temp12;
    log1(idx).temp13 := :OLD.temp13;
    log1(idx).temp14 := :OLD.temp14;
    log1(idx).temp15 := :OLD.temp15;
    log1(idx).temp16 := :OLD.temp16;
    log1(idx).temp17 := :OLD.temp17;
    log1(idx).temp18 := :OLD.temp18;
    log1(idx).temp19 := :OLD.temp19;
    log1(idx).temp20 := :OLD.temp20;
    log1(idx).temp21 := :OLD.temp21;
    log1(idx).temp22 := :OLD.temp22;
    log1(idx).temp23 := :OLD.temp23;
    log1(idx).temp24 := :OLD.temp24;
    log1(idx).temp25 := :OLD.temp25;
    log1(idx).temp26 := :OLD.temp26;
    log1(idx).temp27 := :OLD.temp27;
    log1(idx).temp28 := :OLD.temp28;
    log1(idx).temp29 := :OLD.temp29;
    log1(idx).temp30 := :OLD.temp30;
    log1(idx).temp31 := :OLD.temp31;
    log1(idx).temp32 := :OLD.temp32;
    log1(idx).temp33 := :OLD.temp33;
    log1(idx).temp34 := :OLD.temp34;
    log1(idx).temp35 := :OLD.temp35;
    log1(idx).temp36 := :OLD.temp36;
    log1(idx).temp37 := :OLD.temp37;
    log1(idx).temp38 := :OLD.temp38;
    log1(idx).temp39 := :OLD.temp39;
    log1(idx).temp40 := :OLD.temp40;
    log1(idx).temp41 := :OLD.temp41;
    log1(idx).temp42 := :OLD.temp42;
    log1(idx).temp43 := :OLD.temp43;
    log1(idx).temp44 := :OLD.temp44;
    log1(idx).temp45 := :OLD.temp45;
    log1(idx).temp46 := :OLD.temp46;
    IF idx >= threshhold THEN
      flush_array();
    END IF;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
  BEGIN
    flush_array();
    DBMS_OUTPUT.PUT_LINE('delete end');
  END AFTER STATEMENT;
END temp11_delete2;
/


select count(*) as cnt from temp11log where temp1 like '%B%';
select count(*) as cnt from temp11 where temp1 like '%B%';


select count(*) as cnt from temp11log where temp1 like '%D%';
select count(*) as cnt from temp11 where temp1 like '%D%';



       CNT
----------
     14811

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
delete from temp11 where temp1 like '%D%';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/

BEGIN
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
execute immediate 'alter trigger temp11_delete2 disable';
insert into temp11log value select sysdate, a.* from temp11 a where temp1 like '%D%';
delete from temp11 where temp1 like '%C%';
execute immediate 'alter trigger temp11_delete2 enable';
DBMS_OUTPUT.PUT_LINE(SYSTIMESTAMP);
END;
/


23-DEC-24 12.57.33.304303000 PM +00:00
23-DEC-24 12.57.47.976664000 PM +00:00

14 sec


alter trigger temp11_delete2 enable;
alter trigger temp11_delete2 disable;

select index_name, table_name, visibility from user_indexes;

alter index temp11_pk invisible;
alter index temp11_temp1 invisible;
alter index temp11_temp2 invisible;
alter index temp11_temp3 invisible;
alter index temp11_temp4 invisible;
alter index temp11_temp5 invisible;
alter index temp11_temp6 invisible;
alter index temp11_temp7 invisible;
alter index temp11_temp8 invisible;
alter index temp11_temp9 invisible;
alter index temp11_temp10 invisible;
alter index temp11_temp11 invisible;

alter index temp11_pk visible;
alter index temp11_temp1 visible;
alter index temp11_temp2 visible;
alter index temp11_temp3 visible;
alter index temp11_temp4 visible;
alter index temp11_temp5 visible;
alter index temp11_temp6 visible;
alter index temp11_temp7 visible;
alter index temp11_temp8 visible;
alter index temp11_temp9 visible;
alter index temp11_temp10 visible;
alter index temp11_temp11 visible;
