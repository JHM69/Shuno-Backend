
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

export const getArtists = async (query: any, username?: string) => {
  const andQueries = buildFindAllQuery(query, username);

  if ('search' in query) {
    andQueries.push({
      name: {
        contains: query.search,
        mode: 'insensitive',
      },
    });
  }

  const artistsCount = await prisma.artist.count({
    where: {
      AND: andQueries,
    },
  });

  const artists = await prisma.artist.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
     
  });

  return {
    artists,
    artistsCount,
  };
};

export const createArtist = async (artist: any, username : string) => {
  const { 
    name,
    creatorType,
    dominantLanguage,
    dominantType,
    bio,
    dob,
    fb,
    twitter,
    wiki,
    availableLanguages,
    isRadioPresent,
    isBand, 
    genres,
    primaryImage,
    images,
    bandMembers,

  } = artist;

 
 
  if (!name ) {
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  } 

  const data : any = {
    slug: `${slugify(name)}`,
    name,
    creatorType,
    primaryImage,
    followerCount: 0,
    fanCount: 0,
    isVerified: true,
    dominantLanguage,
    dominantType,
    bio,
    dob,
    fb,
    twitter,
    wiki,
    availableLanguages,
    isRadioPresent,
    isBand: (isBand === "true"),
    addedBy: {
      connect: {
        username,
      },
    },
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
  if(bandMembers){
    data.bandMembers = {
      connect: bandMembers.map((bandMember: any) => ({
        slug: bandMember,
      })),
    }
  }


  const createdArtist = await prisma.artist.create( {
    data
  }).catch(() => { 
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
  }); 
  return {
    createdArtist 
  };
};

export const getArtist = async (slug: string) => {
  const artist = await prisma.artist.findUnique({
    where: {
      slug,
    },
    include: {
      addedBy: true,
      genres: {
        select: {
          slug: true, 
        }
      },
      images: true,
      bandMembers: {
        select: {
          slug: true,
          name: true,
          primaryImage: true,
        }
      },
      songs: {
        select: {
          slug: true,
          name: true, 
          primaryImage: true,
        }
      },
      bandMemberOf: {
        select: {
          slug: true,
          name: true,
          primaryImage: true,
        }
      }, 
    },
  });

  return {
    artist
  };
};

export const updateArtist = async (artist: any, slug: string) => {
  const { 
    name,
    creatorType,
    dominantLanguage,
    primaryImage,
    dominantType,
    bio,
    dob,
    fb,
    twitter,
    wiki,
    availableLanguages,
    isRadioPresent,
    isBand, 
    genres,
    bandMembers,
    images,
  } = artist;

  const data : any = {
    slug: `${slugify(name)}`,
    name,
    creatorType,
    primaryImage,
    followerCount: 0,
    fanCount: 0,
    isVerified: true,
    dominantLanguage,
    dominantType,
    bio,
    dob,
    fb,
    twitter,
    wiki,
    availableLanguages,
    isRadioPresent,
    isBand: (isBand === "true"),
  }

  if(genres[0].slug){
    console.log("genres1")
    console.log(genres)
    data.genres = {
      connect: genres.map((genre: any) => ({
        slug: genre.slug,
      })),
    }
  }

  if (genres && Array.isArray(genres) && genres.every((genre) => typeof genre === 'string')) {
    console.log("genres2")
    console.log(genres)
    data.genres = { 
      connect: genres.map((genre: string) => ({
        slug: genre,
      })),
    };
  }

  if(images){ 
    data.images = {
      create: images.map((image: any) => ({
        url: image.url,
        type: image.type,
      })),
    }
  }
  if(bandMembers){ 
    data.bandMembers = {
      connect: bandMembers.map((bandMember: any) => ({
        slug: bandMember,
      })),
    }
  }


  const updatedArtist = await prisma.artist.update({
    where: {
      slug,
    },
    data 
  }).catch((e) => {
    throw new HttpException(422, { errors: { title: ["Required Name fields are missing"] } });
    }
  );

  return {
    updatedArtist
  };
};

export const deleteArtist = async (slug: string) => {
  await prisma.artist.delete({
    where: {
      slug,
    },
  });
};
