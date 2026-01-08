# Neo4j

> database：urbanWaterlogging
>
> password：jing0406



## 创建节点--CREATE

```CQL
CREATE (dept:Dept { deptno:10,dname:"Accounting",location:"Hyderabad" })
```

- 创建具有一些属性（deptno，dname，位置）的Dept节点，这里的属性名称是deptno，dname，location

  属性值为10，"Accounting","Hyderabad"

- dept节点名称

- Dept节点标签名称`Neo4j中使用标签名访问节点信息`

![image-20241112102131450](Neo4j.assets/image-20241112102131450.png)



## 匹配节点--MATCH&RETURN

:warning: MATCH不能单独使用，如`MATCH (dept:Dept)`会报错

```CQL
# 查询Dept下的内容
MATCH (dept:Dept) return dept

# 查询Employee标签下 id=123，name="Lokesh"的节点
MATCH (p:Employee {id:123,name:"Lokesh"}) RETURN p

## 查询Employee标签下name="Lokesh"的节点，使用（where命令）
MATCH (p:Employee)
WHERE p.name = "Lokesh"
RETURN p
```

![image-20241112102145659](Neo4j.assets/image-20241112102145659.png)



## 创建标签--CREATE

> - 可以创建如下的标签
>   - 为节点创建单个标签
>   - 为节点创建多个标签
>   - 为关系创建单个标签

为节点创建单个标签

```CQL
CREATE (google1:GooglePlusProfile)
```

![image-20241112104326250](Neo4j.assets/image-20241112104326250.png)

为节点创建多个标签

```CQL
CREATE (m:Movie:Cinema:Film:Picture)
```

![image-20241112104621241](Neo4j.assets/image-20241112104621241.png)

为关系创建单个标签(同时创建节点)

```CQL
CREATE (p1:Profile1)-[r1:LIKES]->(p2:Profile2)
```

![image-20241112104905835](Neo4j.assets/image-20241112104905835.png)



## 语句过滤-WHERE&MATCH

```CQL
match(emp:Employee) where emp.name = 'Lokesh' and emp.id=123  return emp
```

![image-20241112110134477](Neo4j.assets/image-20241112110134477.png)



## 现有节点加关系

:bulb: 需要先确保两节点都存在

```CQL
MATCH (cust:Customer),(cc:CreditCard) 
WHERE cust.id = "1001" AND cc.id= "5001" 
CREATE (cust)-[r:DO_SHOPPING_WITH{shopdate:"12/12/2014",price:55000}]->(cc) 
RETURN r
```

![image-20241112110923234](Neo4j.assets/image-20241112110923234.png)



## 删除节点-MATCH&DELETE

```CQL
MATCH (e: Employee) DELETE e
```

![image-20241112112034662](Neo4j.assets/image-20241112112034662.png)



## 删除关系-MATCH&DELETE

先确保两者及关系存在

```CQL
MATCH (cc:CreditCard)-[r]-(c:Customer)RETURN r 
```

![image-20241112112228956](Neo4j.assets/image-20241112112228956.png)

```CQL
MATCH (cc: CreditCard)-[rel]->(c:Customer) 
DELETE cc,c,rel
```

![image-20241112112406329](Neo4j.assets/image-20241112112406329.png)

再查询就没有了



## 删除节点属性

:bulb: 确保节点有对应属性

```cql
CREATE (book:Book {id:122,title:"Neo4j Tutorial",pages:340,price:250}) 
```

![image-20241112123123757](Neo4j.assets/image-20241112123123757.png)

```CQL
match(book:Book{id:122})remove book.price return book
```

![image-20241112123143317](Neo4j.assets/image-20241112123143317.png)



## 删除节点标签

:bulb: 先确保节点有标签

```CQL
MATCH (m:Movie) RETURN m
```

![image-20241112123730010](Neo4j.assets/image-20241112123730010.png)

```CQL
match(m:Movie) remove m:Picture
```

![image-20241112123818706](Neo4j.assets/image-20241112123818706.png)



## 添加或修改属性值

```CQL
match(book:Book) set book.title = 'superStar' return book
```

![image-20241112124647837](Neo4j.assets/image-20241112124647837.png)

