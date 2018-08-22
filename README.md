# mysql-multi-node
Execute sql in multiple mysql database node.

## Execute sql command in multiple mysql node
```
node index.js "show databases"
[0] Starting execute sql at node: 192.168.12.240:3306
[1] Starting execute sql at node: 192.168.12.241:3306
[2] Starting execute sql at node: 192.168.12.242:3306
Success to connect node:192.168.12.240:3306
Success to connect node:192.168.12.241:3306
Success to connect node:192.168.12.242:3306
Execute sucessfully at node:192.168.12.241:3306, results: [{"Database":"information_schema"},{"Database":"abi_test"},{"Database":"cnbd"},{"Database":"cnbd2"},{"Database":"db2"},{"Database":"mysql"},{"Database":"performance_schema"},{"Database":"test"}]
Execute sucessfully at node:192.168.12.240:3306, results: [{"Database":"information_schema"},{"Database":"abi_test"},{"Database":"cnbd"},{"Database":"cnbd2"},{"Database":"db1"},{"Database":"mysql"},{"Database":"performance_schema"},{"Database":"test"}]
Execute sucessfully at node:192.168.12.242:3306, results: [{"Database":"information_schema"},{"Database":"abi_test"},{"Database":"cnbd"},{"Database":"cnbd2"},{"Database":"db3"},{"Database":"mysql"},{"Database":"performance_schema"},{"Database":"test"}]
Success execute sql at all nodes.

```

## Execute sql script file in multiple mysql node
```
node index.js ./testsql.sql 
[0] Starting execute sql at node: 192.168.12.240:3306
[1] Starting execute sql at node: 192.168.12.241:3306
[2] Starting execute sql at node: 192.168.12.242:3306
Success to connect node:192.168.12.241:3306
Success to connect node:192.168.12.242:3306
Success to connect node:192.168.12.240:3306
Execute sucessfully at node:192.168.12.241:3306, results: {"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
......
Execute sucessfully at node:192.168.12.240:3306, results: {"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
Execute sucessfully at node:192.168.12.240:3306, results: {"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
Execute sucessfully at node:192.168.12.240:3306, results: {"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
Success execute sql at all nodes.

```