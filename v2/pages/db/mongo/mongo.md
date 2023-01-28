---
id: mongo
title: MongoDB
sidebar_label: Overview
---

## Courses

- MongoDB University
  - [M001 Basics](https://university.mongodb.com/courses/M001/about)

## Setup

### Linux

- [Guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
- ```sudo systemctl enable mongod``` to enable mongodb on system startup
- ```sudo service start mongod``` to manually start mongodb
- ```mongo``` start using MongoDB, if enabled
- ```show dbs``` show databases
- ```use [db_name]``` use a db
- ```show collections``` show collections of a db
- ```db.[collection_name].find().pretty()``` show items in collection

### VS Code

- Install MongoDB for VSCode

### MongoDB Compass

- GUI for MongoDB

## Overview

- [Atlas](mongo-atlas)
- [Basics](mongo-basics)
- [Create](mongo-create)
- [Read](mongo-read)
- [Update](mongo-update)
- [Delete](mongo-delete)
- [Query Operators](mongo-query-operators)
