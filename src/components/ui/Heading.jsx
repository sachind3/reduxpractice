const Heading = ({ title }) => {
  return (
    <div className="relative">
      <h4 className="uppercase font-bold text-2xl text-slate-800 border-l-4 border-pink-400 pl-2">
        {title}
      </h4>
    </div>
  );
};
export default Heading;
