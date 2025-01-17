# 团队介绍

团队管理包含添加团队、编辑团队、删除团队等操作。

## 团队列表

团队列表已卡片的形式展现，目前没有做分页处理。卡片包含的团队信息分别为：团队头像、成员人数、团队名称、团队管理员以及编辑时间。
左上角搜索框可根据团队名称搜索团队，回车触发搜索动作。

![teams](http://cdn.masastack.com/stack/doc/auth/teams.png)

## 新增团队

新增团队为Step方式分别为团队基础信息、团队管理员、团队成员。

> 只有员工才能加入团队

### 团队基础信息

输入团队名称，激活下一步按钮，默认会根据团队名称首个字符以及选择的颜色生成团队头像。

![team-add-basic](http://cdn.masastack.com/stack/doc/auth/team-add-basic.png)

### 团队管理员

自顶向下依次为选择团队管理员、设置团队管理员角色、设置团队管理员权限

> 角色列表中列出所有的可用角色，由于角色可以限制绑定人数，管理员人数大于角色可绑定人数时会禁用该角色。

底部为应用权限树，应用数据从PM中获取。通过权限树可以禁用从角色继承的权限或补充权限。

![team-add-admin](http://cdn.masastack.com/stack/doc/auth/team-add-admin.png)

### 团队成员

同团队管理员

> 选择团队成员时，已自动过滤设置为该团队管理员的员工

![team-add-member](http://cdn.masastack.com/stack/doc/auth/team-add-member.png)
