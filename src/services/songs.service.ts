/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import slugify from 'slugify';

import prisma, { songStore } from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { Song } from '@prisma/client';


const buildFindAllQuery = (query: any, username: string | undefined) => {
  const queries: any = [];
  const orAuthorQuery = [];

  if (username) {
    orAuthorQuery.push({
      username: {
        equals: username,
      },
    });
  }
  return queries;
};

export const getSongs = async (query: any, username?: string) => {
  const andQueries = buildFindAllQuery(query, username);
  const songsCount = await prisma.song.count({
    where: {
      AND: andQueries,
    },
  });

  if ('search' in query) {
    andQueries.push({
      name: {
        contains: query.search,
        mode: 'insensitive',
      },
    });
  }

     console.log("Searching for Similar Songs");
     console.log(query.search);
      await songStore.similaritySearch(query.search, 10, "default").catch((e) => {
        console.log("Error in Similarity Search");
        console.log(e);
        throw new HttpException(422, { errors: { title: ["Error in Searching Similar Songs"] } });
      }).then((result) => {
        console.log("Similarity Search Result");
        console.log(result);
        return result;
      });



  const songs = await prisma.song.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    
     
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
    
    select: {
      name: true,
      slug: true,
      primaryImage: true,
      releaseDate: true,
      duration: true,
      label: true,
      language: true,
      hasLyrics: true,
      url: true,
      contentType: true,
      origin: true,
      genres: {
        select: {
          name: true,
        },
      },
      primaryArtists: {
        select: {
          name: true,
          slug: true,
          primaryImage: true,
        },
      },
      featuredArtists: {
        select: {
          name: true,
          slug: true,
          primaryImage: true,
        },
      },
      // downloadUrls: true,
      // images: true,
      // playLists: true,
      
      album: {
        select: {
          name: true,
          slug: true,
          coverImage: true,
        },
      },
    },
  });

  return {
    songs,
    songsCount,
  };
};

export const createSong = async (song: any, username : string) => {
  const { 
    name,  
    albumSlug,
    primaryArtists, 
    featuredArtists, 
    genres, 
    releaseDate,
    duration,
    label, 
    language,
    hasLyrics,
    url,
    tags,
    mood,
    copyright,
    contentType,
    origin,
    lyricsSnippet, 
    mediaPreviewUrl,
    permaUrl, 
    kbps320,
    isDolbyContent, 
    trillerAvailable ,  
    primaryImage,
    images, 
    downloadUrls
  } = song;


  console.log("Creating Song");

  console.log({tags});
  console.log({mood});

  const data : any = {
    slug : `${slugify(name)}`,
    name,
    year: new Date(releaseDate).getFullYear().toString(),
    releaseDate: new Date(releaseDate),
    duration : Number(duration),
    label,
    primaryImage,  
    playCount: 0,
    language,
    url,
    copyright,
    contentType,
    origin,
    lyricsSnippet,
    hasLyrics: (hasLyrics === "true"),
    encryptedMediaUrl: "",
    encryptedMediaPath: "",
    mediaPreviewUrl,
    permaUrl,
    albumUrl: "", 
    tags,
    mood,
    kbps320 : (kbps320 === "true"),
    isDolbyContent : (isDolbyContent === "true"),
    disabled: "false",
    disabledText: "",
    cacheState: "", 
    trillerAvailable : (trillerAvailable === "true"),
    labelUrl: "",
    addedBy: { connect: { username } },
    album : {
      connect : {
        slug : albumSlug
      }
    }
  } 



 
  if(primaryArtists){
    data.primaryArtists = {
      connect: primaryArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }
 

  if(featuredArtists){
    data.featuredArtists = {
      connect: featuredArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }
 
  
  if(genres){
    data.genres = {
      connect: genres.map((genre: any) => ({
        slug: genre,
      })),
    }
  }
 


  if(images){
    data.images = {
      create: images.map((image: any) => ({
        url: image.url,
        type: image.type,
      })),
    }
  } 

  if(downloadUrls && downloadUrls.length > 0){
    data.downloadUrls = {
      create: downloadUrls.map((downloadUrl: any) => ({
        url: downloadUrl.url,
        type: downloadUrl.type,
      })),
    }
  } 

  const content = `
  -- Song Information -- \n
  Song Name: ${data.name} \n 
  Primary Artists: ${primaryArtists.map((artist: any) => artist).join(", ")} \n
  Featured Artists: ${featuredArtists.map((artist: any) => artist).join(", ")} \n
  Genres: ${genres.map((genre: any) => genre).join(", ")} \n
  Language: ${data.language} \n
  Year: ${data.year} \n
  Label: ${data.label} \n
  Duration: ${data.duration} \n
  Tags : ${data.tags} \n
  Mood : ${data.mood} \n
  Lyrics: ${data.lyricsSnippet} \n `;

  data.content = content;


  console.log(content);


  await prisma.song.create( {
    data:{
      ...data,
      content,
    }
  }).catch((e) => { 
    console.log("Error in Creating Song");
    console.log(e);
    throw new HttpException(422, { errors: { title: ["Error in Creating Song"] } });
  }).then(async (songData) => {
    console.log("Song Created");
    await songStore.addModels([songData]).then(() => {
      console.log("Added Song to Vector Store");
      return {
        song: songData,
        message : "Added Song with embeddings"
      };
    }).catch((e) => {
      console.log("Error in Adding Song to Vector Store");
      console.log(e);
      return {
        song: songData,
        message : "Added Song, Failed in embeddings"
      };
      
     }
    );
  });

};

export const getSong = async (slug: string) => {
  const song = await prisma.song.findUnique({
    where: {
      slug,
    },
    include: {
      genres: {
        select: {
          slug: true,
        },
      },
      primaryArtists: {
        select: {
          name: true,
          slug : true,
          
          primaryImage: true,
        },
      }, 
      downloadUrls: true,
      images : true,
      featuredArtists: {
        select: {
          name: true,
          slug : true,
          primaryImage: true,
        },
      }, 
      playLists: {
        select: {
          name: true,
        },
      },
      album: {
        select: {
          name: true,
          coverImage: true,
          slug: true,
        },
      },
      likeds: true,
      _count: {
        select: {
          likeds: true,
        },
      },
    },
  });

  return {
    song
  };
};

export const updateSong = async (song: any, id: string) => {

  // const { namne  } = song;
  console.log("Updating Song");
  console.log({song});
  const { name, releaseDate, copyright, duration, label, language, hasLyrics, url, tags, mood, contentType, origin, lyricsSnippet, mediaPreviewUrl, permaUrl, kbps320, isDolbyContent, trillerAvailable, primaryImage, images, albumSlug, primaryArtists, featuredArtists, genres } = song;


  const data : any = {
    slug : `${slugify(name)}`,
    name,
    year: new Date(releaseDate).getFullYear().toString(),
    releaseDate: new Date(releaseDate),
    duration : Number(duration),
    label,
    primaryImage,  
    playCount: 0,
    language,
    url,
    copyright,
    contentType,
    origin,
    lyricsSnippet,
    hasLyrics: (hasLyrics === "true"),
    encryptedMediaUrl: "",
    encryptedMediaPath: "",
    mediaPreviewUrl,
    permaUrl,
    albumUrl: "", 
    tags,
    mood,
    kbps320 : (kbps320 === "true"),
    isDolbyContent : (isDolbyContent === "true"),
    disabled: "false",
    disabledText: "",
    cacheState: "", 
    trillerAvailable : (trillerAvailable === "true"),
    labelUrl: "",
    album : {
      connect : {
        slug : albumSlug
      }
    }
  } 

 
  if(primaryArtists){
    data.primaryArtists = {
      connect: primaryArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }
 

  if(featuredArtists){
    data.featuredArtists = {
      connect: featuredArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }
 
  
  if(genres){
    data.genres = {
      connect: genres.map((genre: any) => ({
        slug: genre,
      })),
    }
  }
 


  if(images){
    data.images = {
      create: images.map((image: any) => ({
        url: image.url,
        type: image.type,
      })),
    }
  } 

  delete data.content;

  const content = `
  -- Song Information -- \n
  Song Name: ${data.name} \n 
  Primary Artists: ${primaryArtists?.map((artist: any) => artist).join(", ")} \n
  Featured Artists: ${featuredArtists.map((artist: any) => artist).join(", ")} \n
  Genres: ${genres.map((genre: any) => genre).join(", ")} \n
  Language: ${data.language} \n
  Year: ${data.year} \n
  Label: ${data.label} \n
  Duration: ${data.duration} \n
  Tags : ${data.tags} \n
  Mood : ${data.mood} \n
  Lyrics: ${data.lyricsSnippet} \n `;

  console.log(content);

  const updatedSong = await prisma.song.update({
    where: {
      id : Number(id),
    },
    data: {
      slug : `${slugify(song.name)}`,
      ...data,
      content,
    },
  });

  await songStore.addModels([updatedSong]).then(() => {
    console.log("Added Song to Vector Store");
  }).catch((e) => {
    console.log("Error in Adding Song to Vector Store");
    console.log(e);
    throw new HttpException(422, { errors: { title: ["Added Song, Failed in embeddings"] } });
   }
  );

  return {
    updatedSong
  };
};

export const deleteSong = async (slug: string) => {
  await prisma.song.delete({
    where: {
      slug,
    },
  });
};
