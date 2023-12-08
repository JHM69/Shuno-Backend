
 
import prisma from '../../prisma/prisma-client';
 
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
 
  if ('search' in query) {
    andQueries.push({
      name: {
        contains: query.search,
        mode: 'insensitive',
      },
    });
  }

  const playlists = await prisma.playlist.findMany({
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
        duration: true,
        year: true,
        language: true, 
        url: true,
        type: true, 
        artists: {
            select: {
            name: true,
            slug: true,
            primaryImage: true,
            
            },
        },
        songs : {
            select: {
            slug: true,
            },
        },
        genres: {
            select: {
            name: true,
            },
        },
    },
  });


  const new_trending  = playlists.map((playlist: any) => ({
    id: playlist.slug,
    title: playlist.name,
    subtitle: playlist.label,
    header_desc: "",
    type: "playlist",
    perma_url: "https://www.shuno.com/playlist"+playlist.slug,
    image:  playlist.primaryImage,                                             
    language: playlist.language,
    year:  playlist.year,
    play_count:  playlist.play_count || "0",
    explicit_content: "0",
    list_count: "0",
    list_type: "",
    list: "",
    more_info: {
      release_date:  playlist.year,
      song_count:  playlist.songs.length.toString() || "0",
      artistMap: {
        primary_artists: [],
        featured_artists: [],
        artists: playlist?.artists?.map((artist: any) => ({
            id: artist.slug,
            name: artist.name,
            role: "primary_artist",
            image: artist.primaryImage,
         })),
      }
    },
    modules: null
  }));

  const albums = await prisma.album.findMany({
    where: { AND: andQueries },
    orderBy: {
      createdAt: 'desc',
    },
    skip: Number(query.offset) || 0,
    take: Number(query.limit) || 10,
    select: {
        id : true,
        name: true,
        slug: true,
        coverImage: true, 
        duration: true, 
        language: true,  
        contentType: true, 
        mainArtist: {
            select: {
            name: true,
            slug: true,
            primaryImage: true,
            
            },
        },
        songs : {
            select: {
            slug: true,
            },
        },
        genres: {
            select: {
            name: true,
            },
        },
    },
  });

  const new_albums  = albums.map((album: any) => ({
    id: album.slug,
    title: album.name,
    subtitle: album.label,
    header_desc: "",
    type: "album",
    perma_url: "https://www.shuno.com/playlist"+album.slug, 
    image:  album.coverImage,                                             
    language: album.language,
    year:  album.year,
    play_count:  album.play_count || "0",
    explicit_content: "0",
    list_count: "0",
    list_type: "",
    list: "",
    more_info: {
      release_date:  album.year,
      song_count:  album.songs.length.toString() || "0",
      artistMap: {
        primary_artists: [],
        featured_artists: [],
        artists: album?.artists?.map((artist: any) => ({
            id: artist.slug,
            name: artist.name,
            role: "primary_artist",
            image: artist.primaryImage,
         })),
      }
    },
    modules: null
  }));
 

  return {
    new_trending,
    new_albums,
    modules : {
     "new_trending": {
			"source": "new_trending",
			"position": 2,
			"score": "",
			"bucket": "",
			"scroll_type": "SS_Condensed_Double",
			"title": "Playlists",
			"subtitle": "",
			"highlight": null,
			"simpleHeader": false,
			"noHeader": false,
			"view_more": {
				"api": "content.getTrending",
				"page_param": "p",
				"size_param": "n",
				"default_size": 10,
				"scroll_type": "SS_Basic_Double"
			},
			"is_JT_module": false
		},
    
    "new_albums": {
			"source": "new_albums",
			"position": 1,
			"score": "",
			"bucket": "",
			"scroll_type": "SS_Condensed_Double",
			"title": "Books, Podcasts, Albums",
			"subtitle": "",
			"highlight": "",
			"simpleHeader": false,
			"noHeader": false,
			"view_more": {
				"api": "content.getAlbums",
				"page_param": "p",
				"size_param": "n",
				"default_size": 10,
				"scroll_type": "SS_Basic_Double"
			},
			"is_JT_module": false
		},
  }
  };
};
 