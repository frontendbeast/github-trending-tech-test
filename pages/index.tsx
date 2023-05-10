import Head from "next/head";
import styles from "@/pages/index.module.css";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

import { Data, Node, Edge } from "../data.types";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_OCTOKIT_ACCESS_TOKEN,
});

export default function Home() {
  const [repos, setRepos] = useState<Edge[]>([]);

  useEffect(() => {
    const getData = async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const sevenDaysAgoStr = `${sevenDaysAgo.getFullYear()}-${(
        "0" +
        (sevenDaysAgo.getMonth() + 1)
      ).slice(-2)}-${("0" + sevenDaysAgo.getDate()).slice(-2)}`;

      const data: Data = await octokit.graphql(
        `
        query SearchMostTop10Star($queryString: String!, $number_of_repos:Int!) {
        search(query: $queryString, type: REPOSITORY, first: $number_of_repos) {
          repositoryCount
          edges {
            node {
              ... on Repository {
                id
                name
                url
                description
                stargazers {totalCount}
                createdAt
              }
            }
          }
        }
      }`,
        {
          queryString: `is:public created:>=${sevenDaysAgoStr} sort:stars`,
          number_of_repos: 24,
        }
      );

      const reposArray: Edge[] = data.search.edges.map(({ node }) => node);

      setRepos(reposArray);
    };

    getData();
  }, []);

  return (
    <>
      <Head>
        <title>GitHub Trending | Darren Jansson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" className={styles.container}>
        <Typography variant="h4" component="h1">
          GitHub Trending
        </Typography>
        <Typography variant="body1">
          The most starred repositories created in the last 7 days!
        </Typography>

        {repos.map(repo => <div>{repo.name}</div>)}
      </Container>
    </>
  );
}
