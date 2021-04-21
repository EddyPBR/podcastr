import { GetStaticProps } from "next";
import { api } from "../services/api";

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

export const getStaticProps: GetStaticProps = async () => {
  const EIGHT_HOURS = 28800;
  
  const { data }: { data: IEpisodes[] } = await api.get("/episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    }
  });

  return {
    props: {
      episodes: data,
    },
    revalidate: EIGHT_HOURS,
  };
}
