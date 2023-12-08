# Shuno Backend

Shuno is a all an one audio streaming platform for musics, podcasts, audiobooks, poem resiting or any kind of audio.

Implementing Shuno-Backend with express js using Postgres Database and prisma.


## structure

<!-- A image from public/images folder  -->

![Shuno-Backend](./public/images/erd.png)


# Getting started

### Install the dependancies

```
npm install
```

### Start PostgreSQL in Windows

```
pg_ctl.exe start -D "C:\Program Files\PostgreSQL\16\data"
```

### Connect the created server

create a _.env_ file at the root of the project  
populate it with the url of your database

```
DATABASE_URL = postgresql://postgres:jhm69@localhost:5432/Shuno
```


### Run the project locally

run `npm run dev`

### Prisma
```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

### Launch Prisma Studio
Entire Database on Prisma studio
```bash
npm run prisma:studio
```

# Api Documentation
To view the api documentation, simply run
```bash
cd docs
npx serve
```
Or you can import the Insomnia JSON to view explore the apis.
 
![Login](/docs/screenshots/1.png)
![Login](/docs/screenshots/2.png)
![Login](/docs/screenshots/3.png)
![Login](/docs/screenshots/4.png)
![Login](/docs/screenshots/5.png)

 









