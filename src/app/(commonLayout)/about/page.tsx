const AboutPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <div>
      <h1>about page</h1>
    </div>
  );
};

export default AboutPage;
