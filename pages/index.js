import * as prismic from '@prismicio/client';
import { getPrismicClient } from "../services/prismic";
import Link from 'next/link';

export default function Home(props) {
  return (
    <div>
      <h1>Teste de CMS com as funcionalidades do Next para implementar no meu site de portfólio</h1>
      <ul>
        {props.posts.map(post => (
          <li key={post.slug}>
            <Link passHref href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const prismicFuncs = getPrismicClient();

  const res = await prismicFuncs.get([prismic.predicate.at("document.type", "posts")]);
  const posts = res.results.map(datas => {
    return {
      slug: datas.uid,
      title: datas.data.title[0].text
    }
  });

  return {
    props: {
      posts
    },
    revalidate: 1800
  };
}
