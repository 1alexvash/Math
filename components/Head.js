import React from "react";

import Head from "next/head";

const appHead = () => {
  return (
    <Head>
      <title>Math</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="stylesheet" href="/static/scss/style.css" />
      <link rel="manifest" href="/static/manifest.json" />
      <link rel="shortcut icon" href="/static/images/favicon.ico" />
    </Head>
  );
};

export default appHead;
