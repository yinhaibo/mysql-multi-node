const Mysql = require('mysql');
const fs = require('fs');
var async = require("async");


var configFile = "./config.json";

if (process.argv.length < 3){
    print_usage();
    return;
}

function print_usage(){
    console.log("Usage: node index.js <SQL Script File, or SQL>");
    console.log("SQL file end by .sql");
}

var config=require(configFile);
var sqlParam = process.argv[2];
if (sqlParam.substring(sqlParam.length - 4, sqlParam.length) == ".sql"){
    // execute sql script file
    var sqlFile = fs.readFileSync(sqlParam, 'utf-8');
    var lines = sqlFile.split("\n");
    var sqls = [];
    var sql = "";
    for (var i in lines){
        var line = lines[i];
        if (!(line.substring(0, 2) == "--")){
            sql += line;
        }
        if (line.substring(line.length-1, line.length) == ';'){
            sqls.push(sql);
            sql = "";
        }
    }
    executeSQLInAllNode(sqls);
}else{
    // execute sql
    executeSQLInAllNode([sqlParam]);
}

function executeSQLInAllNode(sqls){
    async.eachOf(config.nodes, function(node, i, callback){
        console.log("[" + i + "]" + " Starting execute sql at node:", node.host+":"+node.port);
        async.series([
            function(cb){initDatabase(node, cb);},
            function(cb){execDatabase(node, sqls, cb);},
            function(cb){closeDatabase(node, cb);}
        ], function(err){
            callback(err);
        })
    }, function(err){
        if (err){
            console.log("Execute sql " + sql + " failed:", err);
        }else{
            console.log("Success execute sql at all nodes.");
        }
    });
}

function initDatabase(dbNode, cb){
    function handleDBDisconnect(cbConn) {
        dbNode.conn = Mysql.createConnection(dbNode);
        dbNode.conn.connect(function (err) {
            if (err) {
                console.log('db error when connecting to:', err);
                cbConn(err);
            }else{
                console.log("Success to connect node:" + dbNode.host + ":" + dbNode.port);
                cbConn();
            }
        });
    
        dbNode.conn.on('error', function (err) {
            dbNode.conn.end();
            console.log("database connect error.", err);
        })
    }
    handleDBDisconnect(cb);
}

function execDatabase(dbNode, sqls, cb){
    async.eachSeries(sqls, function(sql, callback){
        dbNode.conn.query(sql, function(error, result){
            if(error){
                console.log("Execute sql error at node:" + dbNode.host + ":" + dbNode.port + ", error:", error);
            }else{
                console.log("Execute sucessfully at node:"  + dbNode.host + ":" + dbNode.port + ", results:", JSON.stringify(result));
                
            }      
            callback(error);  
        });
    }, function(error){
        cb(error);
    });
}

function closeDatabase(dbNode, cb){
    dbNode.conn.end();
    cb();
}