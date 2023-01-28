---
id: docker
title: Docker
sidebar_label: Overview
---

## Setup

### Official

- Docker Engine: [Guide](https://docs.docker.com/engine/install/ubuntu/)
- Docker Compose: [Guide](https://docs.docker.com/compose/install/)
- Docker Non-Root: [Guide](https://docs.docker.com/engine/install/linux-postinstall/)
- Docker Station: Graphical UI for Docker [DockStation](https://dockstation.io/)

### Snap (Not recommended)

```bash
# install from snap
sudo snap install docker

# check version
docker -v
docker-compose -v

# test
sudo docker run hello-world
```

---

## Basic Commands

```bash
# images
docker image ls
docker image rm [id]

# containers
docker container ls
docker container rm [id]
docker run [container_id]
docker run [container_id] -it
```

---

## Overview

- Image
- Container
- Dockerfile
- dockerignore
- docker-compose
- Development vs Production
  - [Multi docker-compose](https://docs.docker.com/compose/extends/)
