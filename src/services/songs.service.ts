
import slugify from 'slugify';
import prisma from '../../prisma/prisma-client';
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
    downloadUrls,
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

  console.log("1"); 
 
  if(primaryArtists){
    data.primaryArtists = {
      connect: primaryArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }
  console.log("2"); 


  if(featuredArtists){
    data.featuredArtists = {
      connect: featuredArtists.map((artist: any) => ({
        slug: artist,
      })),
    }
  }

  console.log("3"); 

  
  if(genres){
    data.genres = {
      connect: genres.map((genre: any) => ({
        slug: genre,
      })),
    }
  }

  console.log("4"); 


  if(images){
    data.images = {
      create: images.map((image: any) => ({
        url: image.url,
        type: image.type,
      })),
    }
  }
  console.log("5"); 

  // if(downloadUrls && downloadUrls.length > 0){
  //   data.downloadUrls = {
  //     create: downloadUrls.map((downloadUrl: any) => ({
  //       url: downloadUrl.url,
  //       type: downloadUrl.type,
  //     })),
  //   }
  // }

  console.log(JSON.stringify(data)); 

 

  const s =  await prisma.song.create( {
    data
  }).catch((e) => { 
    console.log(e);
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
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
