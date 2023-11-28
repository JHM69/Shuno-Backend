
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

  const songs = await prisma.song.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
    include: {
      genres: true,
      primaryArtists: true,
      featuredArtists: true,
      downloadUrls: true,
      images: true,
      playLists: true,
      album: true,
      addedBy: {
        select: {
          username: true,
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
    playLists, 
    genres,
    year,
    releaseDate,
    duration,
    label,
    explicitContent,
    playCount,
    language,
    hasLyrics,
    url,
    copyright,
    contentType,
    origin,
    lyricsSnippet,
    encryptedMediaUrl,
    encryptedMediaPath,
    mediaPreviewUrl,
    permaUrl,
    albumUrl,
    rightId,
    kbps320,
    isDolbyContent,
    disabled,
    disabledText,
    cacheState,
    vcode,
    trillerAvailable,
    labelUrl,
    primaryImage,
    images,
    downloadUrls,
  } = song;

  if (!name ) {
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  }

  const data : any = {
    slug : `${slugify(name)}`,
    name,
    year,
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
    encryptedMediaUrl,
    encryptedMediaPath,
    mediaPreviewUrl,
    permaUrl,
    albumUrl, 
    kbps320 : (kbps320 === "true"),
    isDolbyContent : (isDolbyContent === "true"),
    disabled,
    disabledText,
    cacheState,
    vcode,
    trillerAvailable : (trillerAvailable === "true"),
    labelUrl,
    addedBy: { connect: { username } },
  }


  if(albumSlug){
    data.album = {
      connect: {
        slug: albumSlug,
      },
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
  if(playLists){
    data.playLists = {
      connect: playLists.map((playList: any) => ({
        slug: playList,
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

  if(downloadUrls){
    data.downloadUrls = {
      create: downloadUrls.map((downloadUrl: any) => ({
        url: downloadUrl.url,
        type: downloadUrl.type,
      })),
    }
  }

  const s =  await prisma.song.create( {
    data
  }).catch(() => { 
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
          name: true,
        },
      },
      primaryArtists: {
        select: {
          name: true,
        },
      }, 
      downloadUrls: true,
      images : true,
      featuredArtists: {
        select: {
          name: true,
        },
      },
      addedBy: {
        select: {
          username: true, 
        },
      },
      playLists: {
        select: {
          name: true,
        },
      },
      album: {
        select: {
          title: true,
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
