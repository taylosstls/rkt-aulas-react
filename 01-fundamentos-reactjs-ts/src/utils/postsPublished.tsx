export interface PostType {
  id: number,
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: {
    type: 'paragraph' | 'link';
    content: string;
  }[];
}

export const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/taylosstls.png',
        name: 'Gustavo Teixeira',
        role: 'Software Enginnering'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
        { type: 'link', content: 'jane.design/doctorcare' }
      ],
      publishedAt: new Date('2024-04-11 18:00:00')
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito',
        role: 'Educator @Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
        { type: 'link', content: 'jane.design/doctorcare' }
      ],
      publishedAt: new Date('2024-04-11 15:00:00')
    },
  ]