既然你的 FoundationPose 是在现有 Docker 镜像基础上增加了：

```text
best.pt
sam_vit_h.pth
groundingdino.pth
weights/*.pth
meshes/*.obj
```

那么先判断这些文件是在：

```text
Docker镜像内部
```

还是

```text
宿主机挂载目录
```

这是第一步。

---

# 第一步：找到正在运行的容器

执行：

```bash
docker ps
```

例如输出：

```text
CONTAINER ID   IMAGE
a1b2c3d4e5f6   foundationpose
```

记住：

```text
a1b2c3d4e5f6
```

---

# 第二步：查看挂载情况

执行：

```bash
docker inspect a1b2c3d4e5f6
```

输出很多内容。

直接搜索：

```text
Mounts
```

例如出现：

```json
"Mounts": [
    {
        "Type": "bind",
        "Source": "/home/user/FoundationPose",
        "Destination": "/workspace/FoundationPose"
    }
]
```

那么说明：

```text
/home/user/FoundationPose
```

是宿主机目录。

容器里的：

```text
/workspace/FoundationPose
```

实际上来自宿主机。

此时：

```text
best.pt
weights/
meshes/
```

大概率都在宿主机。

属于挂载方式。

---

如果看到：

```json
"Mounts": []
```

或者：

```json
"Mounts": null
```

那么说明：

```text
没有挂载
```

所有文件都在镜像内部。

---

# 情况一：发现是挂载目录

例如：

```json
"Source": "/home/user/FoundationPose"
```

---

进入宿主机：

```bash
cd /home/user
```

查看：

```bash
ls
```

应该能看到：

```text
FoundationPose
```

---

压缩整个项目：

```bash
tar -czvf FoundationPose.tar.gz FoundationPose
```

生成：

```text
FoundationPose.tar.gz
```

---

导出镜像：

查看镜像：

```bash
docker images
```

例如：

```text
foundationpose latest
```

导出：

```bash
docker save -o foundationpose.tar foundationpose:latest
```

---

最终得到：

```text
foundationpose.tar
FoundationPose.tar.gz
```

---

复制到新机器：

```text
foundationpose.tar
FoundationPose.tar.gz
```

---

新机器导入镜像：

```bash
docker load -i foundationpose.tar
```

---

解压项目：

```bash
tar -xzvf FoundationPose.tar.gz
```

得到：

```text
/home/xxx/FoundationPose
```

---

启动容器：

假设原来挂载的是：

```text
/home/user/FoundationPose
```

对应容器：

```text
/workspace/FoundationPose
```

那么新机器：

```bash
docker run \
-it \
--gpus all \
-v /home/xxx/FoundationPose:/workspace/FoundationPose \
foundationpose:latest
```

即可。

---

# 情况二：没有挂载

如果：

```json
"Mounts": []
```

说明：

```text
best.pt
sam_vit_h.pth
groundingdino.pth
weights
meshes
```

全部已经在容器内部。

---

进入容器：

```bash
docker exec -it a1b2c3d4e5f6 bash
```

查看：

```bash
find / -name "best.pt"
```

例如：

```text
/workspace/FoundationPose/best.pt
```

说明文件已经在容器里。

---

此时不要导出镜像。

先把当前容器保存成新镜像。

执行：

```bash
docker commit a1b2c3d4e5f6 foundationpose_complete
```

查看：

```bash
docker images
```

会出现：

```text
foundationpose_complete
```

---

导出：

```bash
docker save -o foundationpose_complete.tar foundationpose_complete
```

---

复制：

```text
foundationpose_complete.tar
```

到新机器。

---

导入：

```bash
docker load -i foundationpose_complete.tar
```

---

启动：

```bash
docker run -it --gpus all foundationpose_complete
```

即可。

---

对于你这种已经在 FoundationPose 上加入：

```text
YOLO
SAM
GroundingDINO
RealSense
CAD模型
```

的情况，我实际建议你执行：

```bash
docker inspect 容器ID
```

先看 `Mounts`。

如果有：

```text
Source
Destination
```

就按“挂载目录”流程做。

如果：

```text
Mounts=[]
```

就按“commit容器后导出镜像”流程做。

这是迁移成功率最高且最省事的做法。
