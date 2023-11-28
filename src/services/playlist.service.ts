
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

export const getPlaylists = async (query: any, username?: string) => {
  const andQueries = buildFindAllQuery(query, username);
  const playlistsCount = await prisma.playlist.count({
    where: {
      AND: andQueries,
    },
  });

  const playlists = await prisma.playlist.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
      
  });

  return {
    playlists,
    playlistsCount,
  };
};

export const createPlaylist = async (playlist: any, username : string) => {
  const { 
    name,  
    
  } = playlist;

  if (!name ) {
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  }

  return {
    createdPlaylist: await prisma.playlist.create({
      data: {
        slug : `${slugify(name)}`,
        name,
        images : { create: playlist.images || [] },
        
        addedBy: { connect: { username } },
      },
    })
  };
};

export const getPlaylist = async (slug: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      slug,
    },
     
  });

  return {
    playlist
  };
};

export const updatePlaylist = async (playlist: any, slug: string) => {

  const updatedPlaylist = await prisma.playlist.update({
    where: {
      slug,
    },
    data: {
      slug : `${slugify(playlist.name)}`,
      ...playlist
    },
   
  });

  return {
    updatedPlaylist
  };
};

export const deletePlaylist = async (slug: string) => {
  await prisma.playlist.delete({
    where: {
      slug,
    },
  });
};
