
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

export const getAlbums = async (query: any, username?: string) => {
  const andQueries = buildFindAllQuery(query, username);
  const albumsCount = await prisma.album.count({
    where: {
      AND: andQueries,
    },
  });

  const albums = await prisma.album.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
     
  });

  return {
    albums,
    albumsCount,
  };
};

export const createAlbum = async (album: any, username : string) => {
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
    labelUrl
  } = album;

  if (!name ) {
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  }

  return {
    createdAlbum: await prisma.album.create({
      data: {
        slug : `${slugify(name)}`,
        name,
        album: { connect: { slug: albumSlug } || {}},
        year,
        releaseDate,
        duration,
        label,
        images : { create: album.images || [] },
        downloadUrls : { create: album.downloadUrls || [] },
        primaryArtists: { connect: primaryArtists.map((slug: string) => ({ slug })) || [] },
        featuredArtists: { connect: featuredArtists?.map((slug: string) => ({ slug })) || [] },
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
        playLists: { connect: playLists.map((slug: string) => ({ slug }))  || []},
        addedBy: { connect: { username } },
        genres: { connect: genres.map((slug: string) => ({ slug }))  || [] }, 
      },
    })
  };
};

export const getAlbum = async (slug: string) => {
  const album = await prisma.album.findUnique({
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
    album
  };
};

export const updateAlbum = async (album: any, slug: string) => {

  const updatedAlbum = await prisma.album.update({
    where: {
      slug,
    },
    data: {
      slug : `${slugify(album.name)}`,
      ...album
    },
   
  });

  return {
    updatedAlbum
  };
};

export const deleteAlbum = async (slug: string) => {
  await prisma.album.delete({
    where: {
      slug,
    },
  });
};
