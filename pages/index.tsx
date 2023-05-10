import Head from "next/head";
import styles from "@/pages/index.module.css";
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";

import { Data, Edge } from "../data.types";
import RepoCard from "@/components/repo-card";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_OCTOKIT_ACCESS_TOKEN,
});

export default function Home() {
  const [repos, setRepos] = useState<Edge[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [tab, setTab] = useState<string>('');
  
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

  useEffect(() => {
    setFavs(JSON.parse(window.localStorage.getItem("favs") ?? "[]"));
    setTab(window.localStorage.getItem("tab") ?? "all");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("favs", JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    window.localStorage.setItem("tab", tab);
  }, [tab]);

  const tabChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string,
  ) => {
    setTab(newTab);
  };

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

        <ToggleButtonGroup
          color="primary"
          value={tab}
          exclusive
          onChange={tabChange}
          className={styles.contentContainer}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="fav">Favourites</ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={4} className={styles.contentContainer}>
          {repos.filter(repo => (tab === 'all' || favs.includes(repo.id))).map((repo) => (
            <Grid xs={4} md={3} lg={2} key={`repo-${repo.id}`}>
              <RepoCard
                {...repo}
                favs={favs}
                setFavs={(favs: string[]) => setFavs(favs)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
