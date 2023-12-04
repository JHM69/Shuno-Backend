
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

export const getHomeData = async (query: any, username?: string) => {
  const andQueries = buildFindAllQuery(query, username);
  
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

  const artists = await prisma.artist.findMany({
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
      genres: {
        select: {
          name: true,
        },
      }
    },
  });

  const albums = await prisma.album.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    
     
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
    
    select: {
      name: true,
      slug: true,
      coverImage: true,
      genres: {
        select: {
          name: true,
        },
      }
    },
  });

  const data = {
    songs, 
    albums,
    artists,
  }

  return {
    data
  };
};

    