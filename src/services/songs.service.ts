/* eslint-disable import/no-extraneous-dependencies */

import slugify from 'slugify';
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import prisma, { songStore } from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';


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
  } = song;


    


  
  
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

  // if(downloadUrls && downloadUrls.length > 0){
  //   data.downloadUrls = {
  //     create: downloadUrls.map((downloadUrl: any) => ({
  //       url: downloadUrl.url,
  //       type: downloadUrl.type,
  //     })),
  //   }
  // }

  // const embeddings = new GoogleGenerativeAIEmbeddings({
  //   modelName: "embedding-001", // 768 dimensions
  //   taskType: TaskType.CLASSIFICATION,
  //   title: data.name,
  // });

  // data.vector = await embeddings.embedQuery( `
  //   -- Song Information -- \n
  //   Song Name: ${data.name} \n
  //   Album Name: ${data.album.name} \n
  //   Primary Artists: ${data.primaryArtists.map((artist: any) => artist.name).join(", ")} \n
  //   Featured Artists: ${data.featuredArtists.map((artist: any) => artist.name).join(", ")} \n
  //   Genres: ${data.genres.map((genre: any) => genre.name).join(", ")} \n
  //   Language: ${data.language} \n
  //   Year: ${data.year} \n
  //   Label: ${data.label} \n
  //   Lyrics: ${data.hasLyrics} \n
  //   Duration: ${data.duration} \n
  //   Tags : ${data.tags} \n
  //   Mood : ${data.mood} \n
  // ` ).then ( (vector) => {
  //   console.log("Vector Created for Song");
  //   console.log(vector);
  //   return vector;
  // }).catch((e) => {
  //   console.log("Error in creating Vector for Song");
  //   console.log(e);

  //   return [];
  // });


 


  const s =  await prisma.song.create( {
    data
  }).catch((e) => { 
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  }).then(() => {

    try{
      console.log("Created Song Vector");
      songStore.addDocuments([data]).then(() => {
        console.log("Added Song to Vector Store");
      }).catch((e) => {
        console.log("Error in Adding Song to Vector Store");
        console.log(e);
        throw new HttpException(422, { errors: { title: ["Added Song, Failed in embeddings"] } });
      });
    }catch(e){
      console.log("Error in Adding Song to Vector Store");
      console.log(e);
      throw new HttpException(422, { errors: { title: ["Added Song, Failed in embeddings"] } });
    }
   
  });


  return {
    song: s
  };
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

export const updateSong = async (song: any, slug: string) => {

  const updatedSong = await prisma.song.update({
    where: {
      slug,
    },
    data: {
      slug : `${slugify(song.name)}`,
      ...song
    },
   
  });

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
