const Title = ({ title }:{title:string}) => {
  return (
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
      {title}
    </h2>
  );
};

export default Title;
