const SectionHeading = ({ heading, subheading }) => {
  return (
    <div className="text-center mb-15">
      <h2 className="custom-head mb-5">{heading}</h2>
      <p className="text-[18px] font-semibold text-sky-500 capitalize">
        {subheading}
      </p>
    </div>
  );
};

export default SectionHeading;
