﻿## 连接字符串

默认情况下, 数据上下文读取的配置节点为:

``` appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "{Replace-Your-ConnectionString}"
  }
}
```
### 设置链接字符串名称

如果希望更改默认读取的节点, 可通过为上下文增加[ConnectionStringName]特性来修改当前数据上下文读取的节点

#### 使用

1. 修改`appsettings.json`, 并配置默认数据库地址以及读库地址

``` appsettings.json
{
  "ConnectionStrings": {
    "ReadDbConnection": "{Replace-Your-Read-DbConnectionString}"
  }
}
```

2. 新建数据上下文

设置读库上下文所属用的数据库链接字符串名称为`ReadDbConnection`

```csharp
[ConnectionStringName("ReadDbConnection")]
public class OrderReadDbContext: MasaDbContext<OrderReadDbContext>
{
    public OrderReadDbContext(MasaDbContextOptions<OrderReadDbContext> options) : base(options)
    {
    }
}
```

#### 其它 

当数据上下文未添加[ConnectionStringName]特性或者指定的Name为时, 默认读取节点为`DefaultConnection`, 否则返回指定`Name`