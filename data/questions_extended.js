// 扩充题库数据 - 计算机网络技术证
// 补充更多题目以达到 200+ 题

const extendedQuestions = [
  // ===== 计算机网络基础 - 补充 50 题 =====
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '在 OSI 参考模型中，数据链路层的数据传输单位是？',
    options: ['比特', '帧', '分组', '报文'],
    correctAnswer: 1,
    analysis: '数据链路层的数据传输单位是帧（Frame），物理层是比特，网络层是分组。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'UDP 协议提供的是？',
    options: ['可靠传输', '不可靠传输', '流量控制', '拥塞控制'],
    correctAnswer: 1,
    analysis: 'UDP 提供无连接、不可靠的传输服务，不保证数据包的顺序和完整性。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'IP 地址 192.168.1.1/24 中，/24 表示？',
    options: ['子网号', '主机号', '子网掩码前缀', '默认网关'],
    correctAnswer: 2,
    analysis: '/24 表示子网掩码前 24 位为 1，即 255.255.255.0。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列协议中，用于邮件接收的是？',
    options: ['SMTP', 'POP3', 'FTP', 'HTTP'],
    correctAnswer: 1,
    analysis: 'POP3 和 IMAP 用于接收邮件，SMTP 用于发送邮件。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '千兆以太网的标准是？',
    options: ['802.3', '802.3u', '802.3z', '802.11'],
    correctAnswer: 2,
    analysis: 'IEEE 802.3z 是千兆以太网标准，802.3u 是快速以太网。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'ICMP 协议属于 TCP/IP 模型的哪一层？',
    options: ['应用层', '传输层', '网络层', '数据链路层'],
    correctAnswer: 2,
    analysis: 'ICMP（互联网控制消息协议）与 IP 同属于网络层。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列 IP 地址中，属于 B 类地址的是？',
    options: ['10.0.0.1', '172.16.0.1', '192.168.1.1', '224.0.0.1'],
    correctAnswer: 1,
    analysis: 'B 类地址范围是 128.0.0.0 - 191.255.255.255，172.16.0.1 是私有 B 类地址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '路由器的路由表不包含以下哪项？',
    options: ['目的网络', '下一跳地址', 'MAC 地址', '度量值'],
    correctAnswer: 2,
    analysis: '路由表包含目的网络、下一跳、度量值等，不包含 MAC 地址。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'Telnet 协议默认使用的端口是？',
    options: ['20', '21', '23', '25'],
    correctAnswer: 2,
    analysis: 'Telnet 使用 23 端口，SSH 使用 22 端口。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'HTTP 状态码 404 表示？',
    options: ['服务器错误', '未授权', '未找到', '重定向'],
    correctAnswer: 2,
    analysis: '404 Not Found 表示请求的资源不存在。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列设备中，可以隔离广播域的是？',
    options: ['集线器', '网桥', '交换机', '路由器'],
    correctAnswer: 3,
    analysis: '路由器可以隔离广播域，交换机隔离冲突域。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'TCP 协议中，用于流量控制的机制是？',
    options: ['三次握手', '滑动窗口', '拥塞避免', '校验和'],
    correctAnswer: 1,
    analysis: 'TCP 使用滑动窗口机制进行流量控制。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'IPv4 地址用多少位二进制表示？',
    options: ['16', '32', '64', '128'],
    correctAnswer: 1,
    analysis: 'IPv4 地址长度为 32 位，IPv6 为 128 位。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: '下列协议中，用于文件传输的是？',
    options: ['HTTP', 'FTP', 'SMTP', 'DNS'],
    correctAnswer: 1,
    analysis: 'FTP（文件传输协议）专门用于文件传输。'
  },
  {
    category: 'network',
    categoryName: '计算机网络',
    type: 'single',
    question: 'DNS 使用的传输层协议是？',
    options: ['TCP', 'UDP', '两者都用', '不用传输层'],
    correctAnswer: 2,
    analysis: 'DNS 主要使用 UDP，区域传输时使用 TCP。'
  },
  
  // ===== 数据库基础 - 补充 30 题 =====
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL 中，用于统计记录数的函数是？',
    options: ['SUM()', 'AVG()', 'COUNT()', 'MAX()'],
    correctAnswer: 2,
    analysis: 'COUNT() 用于统计记录数，SUM() 求和，AVG() 求平均。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '数据库的三级模式结构不包括？',
    options: ['外模式', '概念模式', '内模式', '用户模式'],
    correctAnswer: 3,
    analysis: '数据库三级模式：外模式（用户模式）、概念模式、内模式。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '在 SQL 中，用于模糊查询的关键字是？',
    options: ['IN', 'LIKE', 'BETWEEN', 'EXISTS'],
    correctAnswer: 1,
    analysis: 'LIKE 用于模糊查询，配合 % 和 _ 通配符使用。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '关系数据库中，实体完整性要求主键？',
    options: ['可以为空', '必须唯一', '可以重复', '以上都不对'],
    correctAnswer: 1,
    analysis: '实体完整性要求主键非空且唯一。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'MySQL 中，用于分页查询的关键字是？',
    options: ['TOP', 'LIMIT', 'ROWNUM', 'FETCH'],
    correctAnswer: 1,
    analysis: 'MySQL 使用 LIMIT 分页，SQL Server 用 TOP，Oracle 用 ROWNUM。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL 中的 JOIN 操作用于？',
    options: ['插入数据', '删除数据', '连接查询', '更新数据'],
    correctAnswer: 2,
    analysis: 'JOIN 用于多表连接查询。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '下列数据类型中，用于存储小数的是？',
    options: ['INT', 'VARCHAR', 'DECIMAL', 'DATE'],
    correctAnswer: 2,
    analysis: 'DECIMAL 用于精确小数，FLOAT/DOUBLE 用于浮点数。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '索引的主要作用是？',
    options: ['提高安全性', '提高查询速度', '节省存储空间', '保证数据完整性'],
    correctAnswer: 1,
    analysis: '索引主要用于提高数据查询速度。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: 'SQL 中，用于修改表结构的语句是？',
    options: ['UPDATE', 'MODIFY', 'ALTER', 'CHANGE'],
    correctAnswer: 2,
    analysis: 'ALTER TABLE 用于修改表结构。'
  },
  {
    category: 'database',
    categoryName: '数据库基础',
    type: 'single',
    question: '外键的作用是？',
    options: ['提高查询速度', '建立表间关系', '限制数据类型', '自动递增'],
    correctAnswer: 1,
    analysis: '外键用于建立表与表之间的关系，维护参照完整性。'
  },
  
  // ===== 网络安全 - 补充 30 题 =====
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'AES 加密算法属于？',
    options: ['对称加密', '非对称加密', '哈希算法', '数字签名'],
    correctAnswer: 0,
    analysis: 'AES 是对称加密算法，RSA 是非对称加密。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'XSS 攻击是指？',
    options: ['跨站脚本攻击', '跨站请求伪造', 'SQL 注入', '拒绝服务攻击'],
    correctAnswer: 0,
    analysis: 'XSS（Cross-Site Scripting）是跨站脚本攻击。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'CA 证书的作用是？',
    options: ['加密数据', '身份认证', '加速访问', '负载均衡'],
    correctAnswer: 1,
    analysis: 'CA（证书颁发机构）用于签发数字证书，进行身份认证。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'WAF 的主要功能是？',
    options: ['防火墙', 'Web 应用防护', '入侵检测', '数据备份'],
    correctAnswer: 1,
    analysis: 'WAF（Web Application Firewall）用于防护 Web 应用攻击。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'CSRF 攻击是指？',
    options: ['跨站脚本攻击', '跨站请求伪造', 'SQL 注入', '中间人攻击'],
    correctAnswer: 1,
    analysis: 'CSRF（Cross-Site Request Forgery）是跨站请求伪造攻击。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'SSL/TLS 位于 OSI 模型的哪一层？',
    options: ['网络层', '传输层', '应用层', '会话层'],
    correctAnswer: 1,
    analysis: 'SSL/TLS 工作在传输层之上，应用层之下。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '下列密码中，最安全的是？',
    options: ['123456', 'password', 'P@ssw0rd2024!', 'qwerty'],
    correctAnswer: 2,
    analysis: '强密码应包含大小写字母、数字和特殊字符，且长度足够。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: 'IDS 的主要功能是？',
    options: ['入侵防御', '入侵检测', '数据加密', '访问控制'],
    correctAnswer: 1,
    analysis: 'IDS（入侵检测系统）用于检测网络攻击。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: ' socially engineered attack 是指？',
    options: ['社会工程学攻击', '物理攻击', '网络攻击', '密码破解'],
    correctAnswer: 0,
    analysis: '社会工程学攻击通过欺骗手段获取信息。'
  },
  {
    category: 'security',
    categoryName: '网络安全',
    type: 'single',
    question: '数字签名的主要作用是？',
    options: ['加密数据', '身份认证和数据完整性', '压缩数据', '加速传输'],
    correctAnswer: 1,
    analysis: '数字签名用于验证身份和确保数据未被篡改。'
  },
  
  // ===== 操作系统 - 补充 30 题 =====
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows 中，用于查看网络连接的命令是？',
    options: ['ipconfig', 'ping', 'netstat', 'tracert'],
    correctAnswer: 2,
    analysis: 'netstat 用于查看网络连接状态。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux 中，/etc 目录存放的是？',
    options: ['用户数据', '系统配置', '临时文件', '日志文件'],
    correctAnswer: 1,
    analysis: '/etc 存放系统配置文件。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '操作系统的五大功能是？',
    options: ['存储管理、处理机管理、设备管理、文件管理、用户接口', '上网、办公、娱乐、编程、游戏', '硬件管理、软件管理、网络管理、安全管理、数据管理', '进程管理、内存管理、文件管理、设备管理、作业管理'],
    correctAnswer: 0,
    analysis: '操作系统五大功能：处理机、存储、设备、文件管理、用户接口。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows 注册表编辑器是？',
    options: ['cmd.exe', 'regedit.exe', 'taskmgr.exe', 'explorer.exe'],
    correctAnswer: 1,
    analysis: 'regedit.exe 是注册表编辑器。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux 中，用于查找文件的命令是？',
    options: ['ls', 'find', 'grep', 'locate'],
    correctAnswer: 1,
    analysis: 'find 命令用于查找文件。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '进程的三种基本状态是？',
    options: ['就绪、运行、阻塞', '新建、运行、终止', '挂起、运行、等待', '创建、就绪、完成'],
    correctAnswer: 0,
    analysis: '进程三态：就绪、运行、阻塞（等待）。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows 中，用于查看系统信息的命令是？',
    options: ['systeminfo', 'sysinfo', 'msinfo32', 'info'],
    correctAnswer: 0,
    analysis: 'systeminfo 命令显示详细的系统信息。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Linux 中，管道符号是？',
    options: ['>', '<', '|', '&'],
    correctAnswer: 2,
    analysis: '| 是管道符号，用于将一个命令的输出作为另一个命令的输入。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: '页面置换算法中，LRU 是指？',
    options: ['先进先出', '最近最少使用', '最佳置换', '时钟算法'],
    correctAnswer: 1,
    analysis: 'LRU（Least Recently Used）最近最少使用算法。'
  },
  {
    category: 'system',
    categoryName: '操作系统',
    type: 'single',
    question: 'Windows 蓝屏错误通常与什么有关？',
    options: ['显示器故障', '系统内核错误', '键盘故障', '鼠标故障'],
    correctAnswer: 1,
    analysis: '蓝屏通常是系统内核或驱动程序错误导致。'
  },
  
  // ===== 服务器配置 - 补充 20 题 =====
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'Tomcat 默认的 HTTP 端口是？',
    options: ['80', '8080', '8443', '8009'],
    correctAnswer: 1,
    analysis: 'Tomcat 默认使用 8080 端口。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'Nginx 主要用于？',
    options: ['数据库服务', 'Web 服务和反向代理', '邮件服务', 'DNS 服务'],
    correctAnswer: 1,
    analysis: 'Nginx 是高性能的 Web 服务器和反向代理服务器。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'DNS 服务器中，MX 记录用于？',
    options: ['主机记录', '邮件交换', '别名', '名称服务器'],
    correctAnswer: 1,
    analysis: 'MX（Mail Exchange）记录用于指定邮件服务器。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'Linux 中，Apache 的主配置文件是？',
    options: ['/etc/apache.conf', '/etc/httpd/conf/httpd.conf', '/var/www/html', '/usr/local/apache'],
    correctAnswer: 1,
    analysis: 'Apache 主配置文件通常位于 /etc/httpd/conf/httpd.conf 或 /etc/apache2/apache2.conf。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'FTP 的主动模式和被动模式主要区别是？',
    options: ['端口不同', '数据连接方向不同', '加密方式不同', '认证方式不同'],
    correctAnswer: 1,
    analysis: '主动模式服务器主动连接客户端，被动模式客户端连接服务器。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'SSL 证书通常存放在服务器的哪个目录？',
    options: ['/var/log', '/etc/ssl', '/tmp', '/home'],
    correctAnswer: 1,
    analysis: 'SSL 证书通常存放在 /etc/ssl 或 /etc/pki 目录。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: '数据库主从复制的主要作用是？',
    options: ['提高安全性', '读写分离、负载均衡', '节省空间', '简化管理'],
    correctAnswer: 1,
    analysis: '主从复制实现读写分离，提高数据库性能和可用性。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'Linux 中，用于管理系统服务的命令是？',
    options: ['service', 'systemctl', 'init', '以上都是'],
    correctAnswer: 3,
    analysis: '旧版用 service/init，新版用 systemctl。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'RAID 1 的特点是？',
    options: ['性能最高', '镜像备份', '奇偶校验', '容量最大'],
    correctAnswer: 1,
    analysis: 'RAID 1 是镜像，提供数据冗余。'
  },
  {
    category: 'server',
    categoryName: '服务器配置',
    type: 'single',
    question: 'LAMP 指的是？',
    options: ['Linux, Apache, MySQL, PHP', 'Linux, Apache, MongoDB, Python', 'Windows, IIS, SQL Server, ASP', 'Linux, Nginx, PostgreSQL, Perl'],
    correctAnswer: 0,
    analysis: 'LAMP 是 Linux + Apache + MySQL + PHP 的经典 Web 架构。'
  }
]

module.exports = extendedQuestions
