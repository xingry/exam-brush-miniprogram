// 计算机网络技术证题库数据
// 用于导入云数据库

const questions = [
  // ========== 计算机网络基础 (100题) ==========
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'OSI参考模型中，物理层的数据传输单位是？',
    options: ['比特', '帧', '分组', '报文'],
    correctAnswer: 0,
    analysis: 'OSI参考模型中，物理层的数据传输单位是比特(bit)，数据链路层是帧，网络层是分组。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'TCP/IP协议栈中，IP协议属于哪一层？',
    options: ['应用层', '传输层', '网络层', '数据链路层'],
    correctAnswer: 2,
    analysis: 'IP协议属于网络层，负责数据包的路由和寻址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列IP地址中，属于C类地址的是？',
    options: ['10.0.0.1', '172.16.0.1', '192.168.1.1', '224.0.0.1'],
    correctAnswer: 2,
    analysis: 'C类地址范围是192.0.0.0-223.255.255.255，192.168.1.1是私有C类地址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '子网掩码255.255.255.0表示网络部分有多少位？',
    options: ['8位', '16位', '24位', '32位'],
    correctAnswer: 2,
    analysis: '255.255.255.0转换为二进制是24个1，表示网络部分占24位。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列设备中，工作在网络层的是？',
    options: ['集线器', '交换机', '路由器', '网桥'],
    correctAnswer: 2,
    analysis: '路由器工作在网络层，根据IP地址进行数据包转发。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'DNS协议的主要功能是？',
    options: ['分配IP地址', '域名解析', '邮件传输', '文件传输'],
    correctAnswer: 1,
    analysis: 'DNS(域名系统)的主要功能是将域名解析为IP地址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'HTTP协议默认使用的端口号是？',
    options: ['21', '23', '80', '443'],
    correctAnswer: 2,
    analysis: 'HTTP默认使用80端口，HTTPS默认使用443端口。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列协议中，属于应用层协议的是？',
    options: ['TCP', 'UDP', 'HTTP', 'IP'],
    correctAnswer: 2,
    analysis: 'HTTP是应用层协议，TCP和UDP是传输层协议，IP是网络层协议。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '以太网使用的介质访问控制方法是？',
    options: ['令牌环', 'CSMA/CD', 'CSMA/CA', '轮询'],
    correctAnswer: 1,
    analysis: '传统以太网使用CSMA/CD(载波监听多路访问/冲突检测)。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'IPv6地址的长度是多少位？',
    options: ['32位', '64位', '128位', '256位'],
    correctAnswer: 2,
    analysis: 'IPv6地址长度为128位，是IPv4(32位)的4倍。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列地址中，属于私有地址的是？',
    options: ['8.8.8.8', '172.32.0.1', '10.0.0.1', '9.0.0.1'],
    correctAnswer: 2,
    analysis: '10.0.0.0/8是私有地址段，8.8.8.8是Google的公共DNS。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'ARP协议的作用是？',
    options: ['路由选择', '域名解析', 'IP地址转MAC地址', '差错控制'],
    correctAnswer: 2,
    analysis: 'ARP(地址解析协议)用于将IP地址解析为MAC地址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列传输层协议中，提供可靠传输的是？',
    options: ['UDP', 'TCP', 'IP', 'ICMP'],
    correctAnswer: 1,
    analysis: 'TCP提供面向连接的可靠传输，UDP提供无连接的不可靠传输。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'MAC地址的长度是多少位？',
    options: ['32位', '48位', '64位', '128位'],
    correctAnswer: 1,
    analysis: 'MAC地址长度为48位(6字节)，通常用十六进制表示。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'VLAN的主要作用是？',
    options: ['提高网速', '隔离广播域', '增加带宽', '加密数据'],
    correctAnswer: 1,
    analysis: 'VLAN(虚拟局域网)的主要作用是隔离广播域，提高网络安全性。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'Ping命令使用的是哪个协议？',
    options: ['TCP', 'UDP', 'ICMP', 'ARP'],
    correctAnswer: 2,
    analysis: 'Ping使用ICMP(互联网控制消息协议)的Echo请求和应答。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '双绞线T568B标准的线序中，第1根线是什么颜色？',
    options: ['橙白', '橙', '绿白', '蓝'],
    correctAnswer: 0,
    analysis: 'T568B线序：1橙白、2橙、3绿白、4蓝、5蓝白、6绿、7棕白、8棕。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列拓扑结构中，可靠性最高的是？',
    options: ['总线型', '星型', '环型', '网状型'],
    correctAnswer: 3,
    analysis: '网状拓扑结构冗余度高，一条链路故障不影响通信，可靠性最高。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '交换机根据什么地址转发数据帧？',
    options: ['IP地址', 'MAC地址', '端口号', '域名'],
    correctAnswer: 1,
    analysis: '交换机工作在数据链路层，根据MAC地址转发数据帧。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'NAT技术的主要作用是？',
    options: ['提高网速', '网络安全', 'IP地址转换', '负载均衡'],
    correctAnswer: 2,
    analysis: 'NAT(网络地址转换)用于将私有IP转换为公网IP，节省IP地址。'
  },
  
  // ========== 数据库基础 (50题) ==========
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '关系型数据库中，二维表的列称为？',
    options: ['记录', '字段', '元组', '关键字'],
    correctAnswer: 1,
    analysis: '表的列称为字段(属性)，行称为记录(元组)。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL语句中，用于查询数据的关键字是？',
    options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
    correctAnswer: 2,
    analysis: 'SELECT用于查询，INSERT用于插入，UPDATE用于更新，DELETE用于删除。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '下列关键字中，用于消除重复记录的是？',
    options: ['ORDER BY', 'GROUP BY', 'DISTINCT', 'WHERE'],
    correctAnswer: 2,
    analysis: 'DISTINCT用于消除查询结果中的重复记录。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '数据库系统的核心是？',
    options: ['数据库', '数据库管理系统', '数据模型', '软件工具'],
    correctAnswer: 1,
    analysis: '数据库管理系统(DBMS)是数据库系统的核心软件。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL语言中，删除表使用的语句是？',
    options: ['DELETE TABLE', 'DROP TABLE', 'REMOVE TABLE', 'CLEAR TABLE'],
    correctAnswer: 1,
    analysis: 'DROP TABLE用于删除表结构，DELETE用于删除表中的数据。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '主键的特点是？',
    options: ['可以为空', '可以重复', '唯一且非空', '自动递增'],
    correctAnswer: 2,
    analysis: '主键必须唯一且非空，用于唯一标识每条记录。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'MySQL中，创建数据库的命令是？',
    options: ['CREATE TABLE', 'CREATE DATABASE', 'NEW DATABASE', 'ADD DATABASE'],
    correctAnswer: 1,
    analysis: 'CREATE DATABASE用于创建数据库，CREATE TABLE用于创建表。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '下列数据类型中，用于存储整数的是？',
    options: ['VARCHAR', 'INT', 'DATE', 'DECIMAL'],
    correctAnswer: 1,
    analysis: 'INT用于存储整数，VARCHAR用于字符串，DATE用于日期。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL中用于排序的关键字是？',
    options: ['SORT', 'ORDER BY', 'ARRANGE', 'GROUP'],
    correctAnswer: 1,
    analysis: 'ORDER BY用于对查询结果进行排序，ASC升序，DESC降序。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '事务的ACID特性中，A指的是？',
    options: ['一致性', '原子性', '隔离性', '持久性'],
    correctAnswer: 1,
    analysis: 'ACID分别指：Atomicity(原子性)、Consistency(一致性)、Isolation(隔离性)、Durability(持久性)。'
  },
  
  // ========== 网络安全 (50题) ==========
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'HTTPS相比HTTP增加的是？',
    options: ['速度', '安全性', '功能', '兼容性'],
    correctAnswer: 1,
    analysis: 'HTTPS在HTTP基础上增加了SSL/TLS加密层，提高了安全性。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '防火墙的主要功能是？',
    options: ['杀毒', '访问控制', '数据备份', '系统优化'],
    correctAnswer: 1,
    analysis: '防火墙主要用于网络访问控制和隔离，阻止未授权访问。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '下列攻击中，属于DDoS攻击的是？',
    options: ['SQL注入', '拒绝服务', '木马', '钓鱼'],
    correctAnswer: 1,
    analysis: 'DDoS(分布式拒绝服务)攻击通过大量请求耗尽目标资源。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'MD5算法的作用是？',
    options: ['加密', '哈希', '压缩', '编码'],
    correctAnswer: 1,
    analysis: 'MD5是一种哈希算法，产生128位的散列值。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '数字证书的作用是？',
    options: ['加密数据', '身份认证', '提高速度', '压缩数据'],
    correctAnswer: 1,
    analysis: '数字证书用于验证通信双方身份，是PKI体系的核心。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '下列端口中，用于SSH服务的是？',
    options: ['21', '22', '23', '25'],
    correctAnswer: 1,
    analysis: 'SSH使用22端口，FTP使用21端口，Telnet使用23端口。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'SQL注入攻击主要针对的是？',
    options: ['数据库', '操作系统', '网络设备', '浏览器'],
    correctAnswer: 0,
    analysis: 'SQL注入通过在输入中插入SQL语句，攻击后端数据库。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '对称加密和非对称加密的区别主要在于？',
    options: ['加密速度', '密钥数量', '算法复杂度', '安全性'],
    correctAnswer: 1,
    analysis: '对称加密使用同一密钥，非对称加密使用公钥和私钥一对密钥。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '下列协议中，用于安全远程登录的是？',
    options: ['Telnet', 'SSH', 'FTP', 'HTTP'],
    correctAnswer: 1,
    analysis: 'SSH提供加密的远程登录，Telnet和FTP以明文传输。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'VPN的主要作用是？',
    options: ['提高网速', '建立加密通道', '屏蔽广告', '防止病毒'],
    correctAnswer: 1,
    analysis: 'VPN(虚拟专用网络)通过加密技术在公共网络上建立安全通道。'
  },
  
  // ========== 操作系统 (50题) ==========
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows系统中，查看IP地址的命令是？',
    options: ['ping', 'ipconfig', 'netstat', 'tracert'],
    correctAnswer: 1,
    analysis: 'ipconfig用于查看IP配置，ping测试连通性，netstat查看连接状态。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux系统中，用于查看文件内容的命令是？',
    options: ['ls', 'cd', 'cat', 'mkdir'],
    correctAnswer: 2,
    analysis: 'cat用于查看文件内容，ls列出目录，cd切换目录，mkdir创建目录。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '进程和程序的主要区别是？',
    options: ['大小不同', '静态与动态', '存储位置', '编写语言'],
    correctAnswer: 1,
    analysis: '程序是静态的指令集合，进程是程序的一次动态执行过程。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows中，强行结束进程的命令是？',
    options: ['tasklist', 'taskkill', 'net stop', 'sc stop'],
    correctAnswer: 1,
    analysis: 'taskkill用于结束进程，tasklist列出进程。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '下列文件系统中，Windows 10默认使用的是？',
    options: ['FAT32', 'NTFS', 'ext4', 'HFS+'],
    correctAnswer: 1,
    analysis: 'Windows默认使用NTFS文件系统，支持大文件和权限控制。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux系统中，超级用户的用户名是？',
    options: ['admin', 'root', 'super', 'system'],
    correctAnswer: 1,
    analysis: 'root是Linux系统的超级用户，拥有最高权限。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '虚拟内存的主要作用是？',
    options: ['提高CPU速度', '扩展物理内存', '保护硬盘', '加速网络'],
    correctAnswer: 1,
    analysis: '虚拟内存利用硬盘空间扩展可用内存，实现内存的虚拟扩充。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows服务管理工具是？',
    options: ['任务管理器', '服务管理器(services.msc)', '设备管理器', '磁盘管理'],
    correctAnswer: 1,
    analysis: 'services.msc是Windows服务管理控制台。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '死锁产生的必要条件不包括？',
    options: ['互斥', '请求与保持', '可剥夺', '循环等待'],
    correctAnswer: 2,
    analysis: '死锁四条件：互斥、请求与保持、不可剥夺、循环等待。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux中修改文件权限的命令是？',
    options: ['chown', 'chmod', 'chgrp', 'permission'],
    correctAnswer: 1,
    analysis: 'chmod用于修改文件权限，chown修改所有者，chgrp修改组。'
  },
  
  // ========== 服务器配置 (30题) ==========
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'Web服务器Apache的默认端口是？',
    options: ['8080', '80', '443', '3306'],
    correctAnswer: 1,
    analysis: 'Apache默认使用80端口(HTTP)，443用于HTTPS。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'MySQL数据库默认端口是？',
    options: ['3306', '1433', '5432', '27017'],
    correctAnswer: 0,
    analysis: 'MySQL默认端口3306，SQL Server是1433，PostgreSQL是5432。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'DNS服务器中，A记录表示？',
    options: ['别名', '主机记录', '邮件交换', '名称服务器'],
    correctAnswer: 1,
    analysis: 'A记录是主机记录，将域名映射到IPv4地址。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'DHCP的作用是？',
    options: ['域名解析', '自动分配IP', '路由选择', '网络监控'],
    correctAnswer: 1,
    analysis: 'DHCP(动态主机配置协议)自动分配IP地址给网络设备。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'IIS是哪种操作系统的Web服务器？',
    options: ['Linux', 'Windows', 'MacOS', 'Unix'],
    correctAnswer: 1,
    analysis: 'IIS(Internet Information Services)是微软Windows的Web服务器。'
  },
  
  // 继续添加更多题目...
  // 这里先添加40道，后续可以继续补充
]

module.exports = questions
