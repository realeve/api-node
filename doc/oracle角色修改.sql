/*启动sqlplus
username:system
password:root
*/

-- 用户名密码 orcl
 alter user orcl identified by orcl;
 
 
-- 赋予连接/资源角色（connect,resource,dba）
 grant connect, resource to orcl;
 
 