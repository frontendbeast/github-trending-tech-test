import Head from 'next/head';
import styles from "@/pages/index.module.css";
import { Typography } from "@mui/material";
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <>
      <Head>
        <title>GitHub Trending | Darren Jansson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg" className={styles.container}>
        <Typography variant="h4" component="h1">GitHub Trending</Typography>
        <Typography variant="body1">The most starred repositories created in the last 7 days!</Typography>
      </Container>
    </>
  );
}
