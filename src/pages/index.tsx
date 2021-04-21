interface IEpisodes {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
}

interface IHomeProps {
  episodes: IEpisodes[];
}

export default function Home(props: IHomeProps) {
  return (
    <div>
      <h1>Index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const data: IEpisodes[] = await response.json();

  const EIGHT_HOURS = 28800;

  return {
    props: {
      episodes: data,
    },
    revalidate: EIGHT_HOURS,
  };
}
