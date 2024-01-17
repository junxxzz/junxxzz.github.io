## oracle 수동으로 시작시키기

---

1. Listener 시작
```bash
cd $ORACLE_HOME/bin
./lsnrctl start
```

2. Listener 확인
```bash
./lsnrctl service
./lsnrctl status
```

3. Oracle Database 시작
```bash
cd $ORACLE_HOME/bin
./sqlplus sys/iMC123 as sysdba
```
```sql
SQL>startup
SQL>exit
```