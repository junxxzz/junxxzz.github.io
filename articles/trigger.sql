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



