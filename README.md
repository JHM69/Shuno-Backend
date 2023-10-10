# Shuno

Shuno is a all an one audio streaming platform for musics, podcasts, audiobooks, poem resiting and Youtube audio listning.

Implementing Shuno-Backend with express js using MySQL and prisma.


## structure

<!-- A image from public/images folder  -->

![Shuno-Backend](./public/images/prisma-erd.svg)



# Getting started

### Install the dependancies

```
npm install
```
 

### Connect the created server

create a _.env_ file at the root of the project  
populate it with the url of your database

```
DATABASE_URL=mysql://root:@localhost:3306/Shuno
```


### Run the project locally

run `npm run dev`

### Prisma
### Launch Prisma Studio

```bash
npm run prisma:studio
```

### Reset the database

- Drop the database
- Create a new database
- Apply migrations
- Seed the database with data

```bash
npm run prisma:reset
```
