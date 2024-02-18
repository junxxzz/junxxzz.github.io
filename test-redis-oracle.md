docker pull redislabs/redis-connect-oracle

docker run -d  --init  --cap-add sys_resource  --name myredisenter -h myredisenter -p 18443:8443 -p 19443:9443 -p 14000-14001:12000-12001 -p 18070:8070 redislabs/redis

curl -o ./cluster -w ''%{http_code}'' -X POST -H 'Content-Type:application/json' -d '{"action":"create_cluster","cluster":{"name":"re-cluster.local"},"node":{"paths":{"persistent_path":"/var/opt/redislabs/persist","ephemeral_path":"/var/opt/redislabs/tmp"}},"credentials":{"username":"demo@redis.com","password":"redislabs"}}' -k https://localhost:19443/v1/bootstrap/create_cluster

curl -o ./bootstrap -w ''%{http_code}'' -u demo@redis.com:redislabs -k http://localhost:19443/v1/bootstrap

curl -o ./nodes -w ''%{http_code}'' -u demo@redis.com:redislabs -k http://localhost:19443/v1/nodes


docker run -itd --name myredisconnect --hostname myredisconnect --privileged -v D:\data\projec\junxxzz.github.io\redisconnect\config:/opt/redislabs/redis-connect/config -v D:\data\projec\junxxzz.github.io\redisconnect\extlib:/opt/redislabs/redis-connect/extlib --net host redislabs/redis-connect start

현재 디비서버의 로그모드 확인
SELECT LOG_MODE FROM V$DATABASE;


확인 결과가 noarchivelog 라면 아래를 실행(서버 재시작 필요)

sqlplus / as sysdba
shutdown immediate
startup mount
alter database archivelog;
alter database open;
-- Should now "Database log mode: Archive Mode"
archive log list

exit;


<!-- 반드시 확인 -->
로그 크기 조정 다시 실행
데이터베이스 구성에 따라 리두 로그의 크기와 수가 허용 가능한 성능을 달성하기에 충분하지 않을 수 있습니다. Debezium Oracle 커넥터를 설정하기 전에 다시 실행 로그의 용량이 데이터베이스를 지원할 만큼 충분한지 확인하세요.

데이터베이스의 리두 로그 용량은 해당 데이터 사전을 저장할 만큼 충분해야 합니다. 일반적으로 데이터 사전의 크기는 데이터베이스의 테이블 및 열 수에 따라 증가합니다. 리두 로그의 용량이 부족하면 데이터베이스와 Debezium 커넥터 모두 성능 문제가 발생할 수 있습니다.



select * from v$recovery_file_dest ;

select name, display_value from V$SYSTEM_PARAMETER where name like 'db_recovery_file_%';


<!-- 적용할 테이블만 로그데이터를 늘려준다 -->
ALTER TABLE ipsi.table1 ADD SUPPLEMENTAL LOG DATA (ALL) COLUMNS;



select * from V$ARCHIVE_DEST_STATUS;


CREATE TABLESPACE ts_logminer DATAFILE '/u01/app/oracle/oradata/XE/ts_logminer.dbf' SIZE 25M REUSE AUTOEXTEND ON MAXSIZE UNLIMITED;


CREATE USER c##dbzuser IDENTIFIED BY dbz
DEFAULT TABLESPACE ts_logminer
QUOTA UNLIMITED ON ts_logminer
;

GRANT CREATE SESSION TO c##dbzuser;
GRANT SET CONTAINER TO c##dbzuser;
GRANT SELECT ON V_$DATABASE to c##dbzuser;
GRANT FLASHBACK ANY TABLE TO c##dbzuser;
GRANT SELECT ANY TABLE TO c##dbzuser;
GRANT SELECT_CATALOG_ROLE TO c##dbzuser;
GRANT EXECUTE_CATALOG_ROLE TO c##dbzuser;
GRANT SELECT ANY TRANSACTION TO c##dbzuser;
GRANT LOGMINING TO c##dbzuser;

GRANT CREATE TABLE TO c##dbzuser;
GRANT LOCK ANY TABLE TO c##dbzuser;
GRANT CREATE SEQUENCE TO c##dbzuser;

GRANT EXECUTE ON DBMS_LOGMNR TO c##dbzuser;
GRANT EXECUTE ON DBMS_LOGMNR_D TO c##dbzuser;

GRANT SELECT ON V_$LOG TO c##dbzuser;
GRANT SELECT ON V_$LOG_HISTORY TO c##dbzuser;
GRANT SELECT ON V_$LOGMNR_LOGS TO c##dbzuser;
GRANT SELECT ON V_$LOGMNR_CONTENTS TO c##dbzuser;
GRANT SELECT ON V_$LOGMNR_PARAMETERS TO c##dbzuser;
GRANT SELECT ON V_$LOGFILE TO c##dbzuser;
GRANT SELECT ON V_$ARCHIVED_LOG TO c##dbzuser;
GRANT SELECT ON V_$ARCHIVE_DEST_STATUS TO c##dbzuser;
GRANT SELECT ON V_$TRANSACTION TO c##dbzuser;

GRANT SELECT ON V_$MYSTAT TO c##dbzuser;
GRANT SELECT ON V_$STATNAME TO c##dbzuser;
