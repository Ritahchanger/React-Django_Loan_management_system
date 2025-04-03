const Title = ({ title }: { title: string }) => {
  return (
    <div  className="mb-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
        {title}
      </h2>
      <div className="h-[3px] w-[100px] bg-red-500 mx-auto">

      </div>
    </div>
  );
};

export default Title;
