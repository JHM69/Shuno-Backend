
import { Song } from '@prisma/client';
import slugify from 'slugify';
import prisma from '../../prisma/prisma-client';
import HttpException from '../models/http-exception.model';
import { findUserIdByUsername } from './auth.service';
import profileMapper from '../utils/profile.utils';


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
      addedBy: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
    },
  });

  return {
    songs,
    songsCount,
  };
};



export const createSong = async (song: Song, username: string) => {
  const { name } = song;

  if (!name) {
    throw new HttpException(422, { errors: { title: ["can't be blank"] } });
  }

  const user = await findUserIdByUsername(username);

  const slug = `${slugify(name)}-${user?.id}`;

  const existingTitle = await prisma.song.findUnique({
    where: {
      slug,
    },
    select: {
      slug: true,
    },
  });

  if (existingTitle) {
    throw new HttpException(422, { errors: { title: ['must be unique'] } });
  }

  const createdSong = await prisma.song.create({
    data: {
      name: song.name,
        album: {
          connect: { id: song.albumId },
        },
        year: song.year,
        releaseDate: song.releaseDate,
        duration: song.duration,
        label: song.label,
        primaryArtists: {
          connect: song?.primaryArtists.map((artistId: number) => ({ id: artistId })),
        },
        featuredArtists: {
          connect: song?.featuredArtists.map((artistId: number) => ({ id: artistId })),
        },
        explicitContent: song.explicitContent,
        playCount: song.playCount,
        language: song.language,
        hasLyrics: song.hasLyrics,
        url: song.url,
        copyright: song.copyright,
        contentType: song.contentType,
        origin: song.origin,
        lyricsSnippet: song.lyricsSnippet,
        encryptedMediaUrl: song.encryptedMediaUrl,
        encryptedMediaPath: song.encryptedMediaPath,
        mediaPreviewUrl: song.mediaPreviewUrl,
        permaUrl: song.permaUrl,
        albumUrl: song.albumUrl,
        rightId: song.rightId,
        kbps320: song.kbps320,
        isDolbyContent: song.isDolbyContent,
        disabled: song.disabled,
        disabledText: song.disabledText,
        cacheState: song.cacheState,
        vcode: song.vcode,
        trillerAvailable: song.trillerAvailable,
        labelUrl: song.labelUrl,
        playLists: {
          connect: song.playLists.map((playListId: number) => ({ id: playListId })),
        },   
        addedBy: {
          connect: { username: username },
        },
        genres: {
          connect: song?.genres.map((genreId: number) => ({ id: genreId })),
        },
    }
  });

  return {
    
  };
};

export const getSong = async (slug: string, username?: string) => {
  const song = await prisma.song.findUnique({
    where: {
      slug,
    },
    include: {
      tagList: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
      favoritedBy: true,
      _count: {
        select: {
          favoritedBy: true,
        },
      },
    },
  });

  return {
    title: song?.title,
    slug: song?.slug,
    body: song?.body,
    description: song?.description,
    createdAt: song?.createdAt,
    updatedAt: song?.updatedAt,
    tagList: song?.tagList.map(tag => tag.name),
    favoritesCount: song?._count?.favoritedBy,
    favorited: song?.favoritedBy.some(item => item.username === username),
    author: {
      ...song?.author,
      following: song?.author.followedBy.some(follow => follow.username === username),
    },
  };
};

const disconnectSongsTags = async (slug: string) => {
  await prisma.song.update({
    where: {
      slug,
    },
    data: {
      tagList: {
        set: [],
      },
    },
  });
};

export const updateSong = async (song: any, slug: string, username: string) => {
  let newSlug = null;
  const user = await findUserIdByUsername(username);

  if (song.title) {
    newSlug = `${slugify(song.title)}-${user?.id}`;

    if (newSlug !== slug) {
      const existingTitle = await prisma.song.findFirst({
        where: {
          slug: newSlug,
        },
        select: {
          slug: true,
        },
      });

      if (existingTitle) {
        throw new HttpException(422, { errors: { title: ['must be unique'] } });
      }
    }
  }

  const tagList = song.tagList?.length
    ? song.tagList.map((tag: string) => ({
        create: { name: tag },
        where: { name: tag },
      }))
    : [];

  await disconnectSongsTags(slug);

  const updatedSong = await prisma.song.update({
    where: {
      slug,
    },
    data: {
      ...(song.title ? { title: song.title } : {}),
      ...(song.body ? { body: song.body } : {}),
      ...(song.description ? { description: song.description } : {}),
      ...(newSlug ? { slug: newSlug } : {}),
      updatedAt: new Date(),
      tagList: {
        connectOrCreate: tagList,
      },
    },
    include: {
      tagList: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
        },
      },
      favoritedBy: true,
      _count: {
        select: {
          favoritedBy: true,
        },
      },
    },
  });

  return {
    title: updatedSong?.title,
    slug: updatedSong?.slug,
    body: updatedSong?.body,
    description: updatedSong?.description,
    createdAt: updatedSong?.createdAt,
    updatedAt: updatedSong?.updatedAt,
    tagList: updatedSong?.tagList.map(tag => tag.name),
    favoritesCount: updatedSong?._count?.favoritedBy,
    favorited: updatedSong?.favoritedBy.some(item => item.username === username),
    author: updatedSong?.author,
  };
};

export const deleteSong = async (slug: string) => {
  await prisma.song.delete({
    where: {
      slug,
    },
  });
};

export const getCommentsBySong = async (slug: string, username?: string) => {
  const queries = [];

  if (username) {
    queries.push({
      author: {
        username,
      },
    });
  }

  const comments = await prisma.song.findUnique({
    where: {
      slug,
    },
    include: {
      comments: {
        where: {
          OR: queries,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          body: true,
          author: {
            select: {
              username: true,
              bio: true,
              image: true,
              followedBy: true,
            },
          },
        },
      },
    },
  });

  const result = comments?.comments.map(comment => ({
    ...comment,
    author: {
      username: comment.author.username,
      bio: comment.author.bio,
      image: comment.author.image,
      following: comment.author.followedBy.some(follow => follow.username === username),
    },
  }));

  return result;
};

export const addComment = async (body: string, slug: string, username: string) => {
  if (!body) {
    throw new HttpException(422, { errors: { body: ["can't be blank"] } });
  }

  const user = await findUserIdByUsername(username);

  const song = await prisma.song.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      body,
      song: {
        connect: {
          id: song?.id,
        },
      },
      author: {
        connect: {
          id: user?.id,
        },
      },
    },
    include: {
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
    },
  });

  return {
    id: comment.id,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    body: comment.body,
    author: {
      username: comment.author.username,
      bio: comment.author.bio,
      image: comment.author.image,
      following: comment.author.followedBy.some(follow => follow.id === user?.id),
    },
  };
};

export const deleteComment = async (id: number, username: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id,
      author: {
        username,
      },
    },
  });

  if (!comment) {
    throw new HttpException(201, {});
  }

  await prisma.comment.delete({
    where: {
      id,
    },
  });
};

export const favoriteSong = async (slugPayload: string, usernameAuth: string) => {
  const user = await findUserIdByUsername(usernameAuth);

  const { _count, ...song } = await prisma.song.update({
    where: {
      slug: slugPayload,
    },
    data: {
      favoritedBy: {
        connect: {
          id: user?.id,
        },
      },
    },
    include: {
      tagList: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
      favoritedBy: true,
      _count: {
        select: {
          favoritedBy: true,
        },
      },
    },
  });

  const result = {
    ...song,
    author: profileMapper(song.author, usernameAuth),
    tagList: song?.tagList.map(tag => tag.name),
    favorited: song.favoritedBy.some(favorited => favorited.id === user?.id),
    favoritesCount: _count?.favoritedBy,
  };

  return result;
};

export const unfavoriteSong = async (slugPayload: string, usernameAuth: string) => {
  const user = await findUserIdByUsername(usernameAuth);

  const { _count, ...song } = await prisma.song.update({
    where: {
      slug: slugPayload,
    },
    data: {
      favoritedBy: {
        disconnect: {
          id: user?.id,
        },
      },
    },
    include: {
      tagList: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
      favoritedBy: true,
      _count: {
        select: {
          favoritedBy: true,
        },
      },
    },
  });

  const result = {
    ...song,
    author: profileMapper(song.author, usernameAuth),
    tagList: song?.tagList.map(tag => tag.name),
    favorited: song.favoritedBy.some(favorited => favorited.id === user?.id),
    favoritesCount: _count?.favoritedBy,
  };

  return result;
};
